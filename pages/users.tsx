
import type { NextPage } from "next";
import { Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";


const Users: NextPage = () => {

  const { data, refetch } = useQuery(gql`
  query UserList {
    users{
      name
    }
  }
`);
  console.log(data, 'data')
  return <Box>
    <Flex justifyContent={"space-between"}>
      <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
        Users
      </Heading >
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"#ffffff"}
        bg={"#0a95ff"}
        border={"1px solid #7aa7c7"}
        onClick={() => Router.push(Routes.Main.Home.route)}
        _hover={{
          bg: "#0074cc",
        }}
      >
        Ask Question
      </Button>
    </Flex>

  </Box>;
};

export default Users;
