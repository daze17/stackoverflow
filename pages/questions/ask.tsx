import type { NextPage } from "next";
import { Heading, Text, Box, Flex, Button, Input, Textarea, Grid, GridItem, Stack, FormControl } from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";


const QuestionAsk: NextPage = () => {

    const [askQuestion] = useMutation(gql`mutation ASK_QUESTION($input: QuestionInput) {
        addQuestion(input: $input){
            questionId
        }
      }`, {
        fetchPolicy: "no-cache",
        onCompleted: async (data: any) => {
            Router.push({
                pathname: Routes.get(Routes.Main.QuestionsDetail.route, {
                    id: data.addQuestion.questionId,
                })
            })
        },
        onError: (error) => console.log(error, 'login failed'),
    });
    const onSubmit = (values: any) => {
        console.log(values, 'values')
        const { title, questionBody, tags } = values
        askQuestion({
            variables: {
                input: {
                    title,
                    questionBody,
                    tags,
                    status: false
                }
            },
        });
    }

    return <Box m={"20px"} borderRadius={"100px"} fontSize={"12px"}>
        <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
            Ask a public question
        </Heading >
        <Grid templateColumns='repeat(4, 1fr)' gap={"30px"}>

            <GridItem colSpan={3}>
                <Formik
                    initialValues={{ title: "", questionBody: "", tags: "" }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur }: any) => (
                        <Form>
                            <Box p={"16px"} bg={"white"} boxShadow='md'>
                                <Heading fontSize={"1rem"} fontWeight={"bold"} mb={"8px"} >
                                    Title
                                </Heading>
                                <Text>Be specific and imagine you’re asking a question to another person</Text>
                                <FormControl id="title">
                                    <Input
                                        onChange={handleChange}
                                        onBlur={handleBlur} placeholder="e.g. Is there an R function for finding the index of an element in vector" />
                                </FormControl>
                                {/* <FormControl id="password"> */}
                                <Heading fontSize={"1rem"} fontWeight={"bold"} mb={"8px"} pt={"20px"}>
                                    Body
                                </Heading>
                                <Text>Include all the information someone would need to answer your question</Text>

                                <FormControl id="questionBody">
                                    <Textarea
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormControl>
                                <Heading fontSize={"1rem"} fontWeight={"bold"} mb={"8px"} pt={"20px"}>
                                    Tags
                                </Heading>
                                <Text>Be specific and imagine you’re asking a question to another person</Text>
                                <FormControl id="tags">
                                    <Input onChange={handleChange}
                                        onBlur={handleBlur} placeholder="e.g. Is there an R function for finding the index of an element in vector" />
                                </FormControl>
                            </Box>
                            <Button
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"#ffffff"}
                                bg={"#0a95ff"}
                                border={"1px solid #7aa7c7"}
                                marginTop="50px"
                                type="submit"
                                _hover={{
                                    bg: "#0074cc",
                                }}
                            >
                                Ask Question
                            </Button>
                        </Form>)}
                </Formik>
            </GridItem>
            <GridItem>
                <Box boxShadow='md'>
                    <Box p={"16px"} bg={"#f8f9f9"} >
                        Step 1: Draft your question
                    </Box>
                    <Box p={"16px"} bg={"white"}>
                        <Text>

                            The community is here to help you with specific coding, algorithm, or language problems.
                        </Text>
                        <br />
                        <Text>
                            Avoid asking opinion-based questions.
                        </Text>
                    </Box>
                </Box>
            </GridItem>
        </Grid>

    </Box>;
};

export default QuestionAsk;
