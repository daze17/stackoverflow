import React from 'react'
import { Box, Button, Heading, FormControl, Textarea } from '@chakra-ui/react'
import { Formik, Form } from "formik";

const QuestionComment = ({ onSubmit }: any) => {

    return (
        <>
            <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"16px"} mt={"16px"}>
                Your Answer </Heading >
            <Box marginLeft={"5px"} w={"100%"} >
                <Formik
                    initialValues={{ commentBody: "" }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur }: any) => (
                        <Form>
                            <FormControl id="commentBody">
                                <Textarea
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </FormControl>
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
                                Post Your Answer
                            </Button>
                        </Form>)}
                </Formik>
            </Box>
        </>)
}

export default QuestionComment