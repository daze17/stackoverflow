import type { NextPage } from "next";
import { useUserContext } from "@app/config/userProvider";
import { Box, Stack, Text, Link, ListItem, List, Flex } from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router from "next/router";

const AccountDetail: NextPage = () => {
    const { user }: any = useUserContext()
    return <>
        <Stack borderBottom='1px' borderColor='gray.200' pb={"20px"}>
            <Flex>
                <Text fontWeight={"bold"}>
                    My email
                </Text>:{" "}{user.email}
            </Flex>
            <Flex>
                <Text fontWeight={"bold"}>
                    My display name
                </Text>:{" "}{user.name}
            </Flex>
        </Stack >
        <Stack>
            <Text>
                My Questions:
            </Text>
            {user?.questions.map((item: any, index: number) =>
                <Box key={index}>
                    <List >
                        <ListItem>
                            <Link color={"blue"} textDecoration={"underline"} onClick={() => Router.push({
                                pathname: Routes.get(Routes.Main.QuestionsDetail.route, {
                                    id: item?.id,
                                })
                            })}>
                                {item.title}
                            </Link>
                        </ListItem>
                    </List>
                </Box>)
            }
        </Stack>
    </>;
};

export default AccountDetail;
