import React from 'react'
import { chakra, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";
import moment from 'moment';

const QuestionHeader = ({ data }: any) => {
    console.log(data, 'data')
    return (
        <Box w={"100%"}>
            <Flex justifyContent={"space-between"}>
                <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
                    {data?.Users?.name} - {data?.title} </Heading >
                <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"#ffffff"}
                    bg={"#0a95ff"}
                    border={"1px solid #7aa7c7"}
                    onClick={() => Router.push(Routes.Additional.QuestionAsk.route)}
                    _hover={{
                        bg: "#0074cc",
                    }}
                >
                    Ask Question
                </Button>
            </Flex>
            <Flex mb={"16px"} pb={"8px"} borderBottom='1px' borderColor='gray.200' fontSize='13px'>
                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Asked
                    </chakra.span>
                    {" "}{moment(data?.createdAt).format('dddd')}
                </Text>

                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Modified
                    </chakra.span>
                    {" "}{moment(data?.createdAt).format('LT')}
                </Text>
                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Viewed
                    </chakra.span>
                    {" "}1 times</Text>
            </Flex>
        </Box>
    )
}

export default QuestionHeader