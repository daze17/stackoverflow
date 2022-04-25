import React, { ReactNode } from "react";
import Navbar from "@app/common/navbar";
import Head from "next/head";
import { Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Routes from "@app/routes/routers"
import MainLayout from "@app/layouts/mainLayout";

type Props = {
  title: string;
  children: React.ReactNode;
};
const NormalLayout = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>
}

const Layout: React.FC<Props> = ({ title, children }) => {
  let RenderLayout = NormalLayout;
  const router = useRouter();
  if (Routes.isMain(router.pathname)) {
    RenderLayout = MainLayout;
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="stackoverflow clone" />
        <link rel="icon" href="/stackoverflowicon.png" />
      </Head>
      <Navbar />
      <Flex justifyContent={"center"} paddingTop={"50px"} >
        <Stack w={"1264px"} bg={"red.100"}>
          <RenderLayout>
            {children}
          </RenderLayout>
        </Stack>
      </Flex>
    </>
  );
};

export default Layout;
