import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import withApollo from "next-with-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import LayoutScene from "@app/layouts/layout";
import Routes from "@app/routes/routers";
import config from "@app/config";
import cookie from "cookie";
import auth from "@app/config/auth"
import { UserProvider } from "@app/config/userProvider";
interface Process {
  browser: boolean
}
declare let process: Process
function MyApp({ Component, apollo, user, title, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="stackoverflow clone" />
        <link rel="icon" href="/stackoverflowicon.png" />
      </Head>
      <UserProvider user={user}>
        <ApolloProvider client={apollo}>
          <ChakraProvider>
            <LayoutScene title={title}>
              <Component {...pageProps} />
            </LayoutScene>
          </ChakraProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: any) => {
  const { Component, ctx } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { req, res, pathname, apolloClient } = ctx;
  const title = Routes.getTitle(pathname);

  // To be removed
  if (!process.browser) {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("strict-transport-security", "max-age=31536000");
  }
  try {
    const { user } = await auth({
      ctx,
      route: pathname,
      req,
      res,
      apolloClient,
    });
    return { pageProps, user, title, pathname };
  } catch (error) {
    console.log("_app.js-error", error);
    return { pageProps, title, pathname }; // _error-luu handhad loop
  }
};

// export default MyApp
export default withApollo(
  ({ initialState, headers: serverHeaders }): any => {
    const httpLink = createHttpLink({
      uri: config.BACKEND_URL,
      // credentials: "include",
    });
    const token = process.browser
      ? cookie.parse(document.cookie || "")[config.TOKEN_KEY]
      : cookie.parse(serverHeaders?.cookie || "")[config.TOKEN_KEY];

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    }));
    const link: any = authLink.concat(httpLink);
    return new ApolloClient({
      link,
      ssrMode: true,
      cache: new InMemoryCache({
      }).restore(initialState || {}),
    });
  }
)(MyApp);
