import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import LayoutScene from "@app/layouts/layout";

function MyApp({ Component, pageProps: { title, ...pageProps } }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <LayoutScene title={title}>
          <Component {...pageProps} />
        </LayoutScene>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
