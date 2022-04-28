import React, { ReactNode } from "react";
import Navbar from "@app/common/navbar";
import { Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Routes from "@app/routes/routers"
import MainLayout from "@app/layouts/mainLayout";
import Footer from "./footer";

type Props = {
  title: string;
  children: React.ReactNode;
};
const NormalLayout = ({ children }: { children: ReactNode }) => {
  return <Box h={"100vh"}>{children}</Box>
}

const Layout: React.FC<Props> = ({ children }) => {
  let RenderLayout = NormalLayout;
  const router = useRouter();
  if (Routes.isMain(router.pathname)) {
    RenderLayout = MainLayout;
  }
  return (
    <>
      <Navbar />
      <Flex justifyContent={"center"} paddingTop={"50px"} bg={Routes.isMain(router.pathname) ? "white" : "#f1f2f3"} >
        <Stack w={"1264px"} >
          <RenderLayout>
            {children}
          </RenderLayout>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
};

export default Layout;
