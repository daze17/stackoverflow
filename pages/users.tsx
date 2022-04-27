
import type { NextPage } from "next";
import { Heading, Text, Box, Flex, Button, Input, Grid, GridItem } from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import UserCard from "@app/common/userCard";
interface ICardItem {
  email: string;
  name: string;
};

const Users: NextPage = () => {

  const { data: _userList, loading }: any = useQuery(gql`
  query UserList {
    users{
      name
      email
    }
  }
`);
  const userList = _userList?.users
  return <Box>
    <Flex justifyContent={"space-between"}>
      <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
        Users
      </Heading >
    </Flex>
    <Input w={"200px"} placeholder={"Filter by user"} marginTop={"20px"} marginBottom={"20px"} />
    <Grid h='200px'
      templateColumns='repeat(4, 1fr)'
      gap={"50px"}>
      {!loading && userList.map((user: ICardItem, index: number) =>
        <GridItem key={index}>
          <UserCard user={user} />
        </GridItem>
      )}

    </Grid>
  </Box>;
};

export default Users;
