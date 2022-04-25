import React from 'react'
import { chakra, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";

const QuestionHeader = () => {
    return (
        <Box w={"100%"}>
            <Flex justifyContent={"space-between"}>
                <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
                    Scala - How to create a class with a constructor that receives an object as parameter
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
            <Flex mb={"16px"} pb={"8px"} borderBottom='1px' borderColor='gray.200' fontSize='13px'>
                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Asked
                    </chakra.span>
                    {" "}today
                </Text>

                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Modified
                    </chakra.span>
                    {" "}today
                </Text>
                <Text mr={"16px"}>
                    <chakra.span color="gray.500">
                        Viewed
                    </chakra.span>
                    {" "}7 times</Text>
            </Flex>
        </Box>
    )
}

export default QuestionHeader