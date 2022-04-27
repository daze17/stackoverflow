import Routes from "@app/routes/routers";
// import { ME, CURRENT_PATIENT } from '@app/middleware/utils/gql';
import Router from "next/router";
import cookie from "cookie";
import Cookies from "js-cookie";
import config from "@app/config";
import { get, isEmpty } from "lodash";
import { CreateApolloClient } from "@app/config/apollo";
import { gql } from "apollo-boost";

const parseCookies = ({ req }) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie || "");
};

const redirect = (res, route) => {
  if (process.browser) {
    Router.push(route);
  } else {
    res.writeHead(303, { Location: route });
    res.end();
  }
};

const auth = async ({ ctx, route, req, res, apolloClient }) => {
  const cookies = parseCookies({ req });
  const token = config.TOKEN_KEY;
  let user = {};
  const USER = process.browser ? Cookies.get(token) : cookies[token];

  const getUser = async (apolloClient) => {
    let response = {};
    response = await apolloClient.query({
      fetchPolicy: "no-cache",
      query: gql`
        query ME {
          me {
            id
            name
            email
            questions {
              id
              title
            }
          }
        }
      `,
    });
    return get(response, "data.me");
  };

  // user route
  if (USER) {
    try {
      // user token baigaad /login path aar orvol user admin tsesruu usrene
      if (route === "/login" || route === "/register") {
        redirect(res, Routes.Main.Home.route);
      }
      // get user information
      try {
        if (!process.browser) {
          apolloClient = CreateApolloClient(USER);
        }
        user = await getUser(apolloClient);
      } catch (error) {
        console.log("User error: ", error);
        return {};
      }

      return { user };
    } catch (Err) {
      console.log(Err);
      return {};
    }
  }
  if (route === "/questions/ask") {
    redirect(res, Routes.Additional.Login.route);
  }
  if (route === "/_error" || route === "/404") {
    invalidRouteRedirect();
  }
  return { user };
};

export default auth;
