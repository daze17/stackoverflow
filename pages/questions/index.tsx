import type { NextPage } from "next";
import { Heading, Text, Box, Flex, Button, Stack, Grid, GridItem, Link } from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import moment from "moment"


const Questions: NextPage = () => {

  const { data: questionList, loading, refetch } = useQuery(gql`
    query QUESTION_LIST {
      questions {
        id
        title
        questionBody
        tags
        status
        createdAt
        updatedAt
        Users {
          name
        }
      }
    }
  `);
  refetch()
  return <Box>
    <Flex justifyContent={"space-between"}>
      <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
        All Questions
      </Heading >
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
    <Text mb={"16px"} pb={"8px"} borderBottom='1px' borderColor='gray.200'>
      {questionList?.questions.length} questions
    </Text>

    <Stack>
      {!loading && questionList?.questions.map((question: any) =>
        <Grid templateColumns='repeat(5, 1fr)' columnGap={"50px"} mb={"16px"} pb={"8px"} borderBottom='1px' borderColor='gray.200' key={question?.id} >
          <GridItem  >
            <Flex alignItems={"end"} flexDirection={"column"}>
              <Text>
                0 votes
              </Text>
              <Text>
                0 answers
              </Text>
              <Text>
                0 views
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={4} >
            <Flex alignItems={"start"} flexDirection={"column"}>
              <Link color={"blue"} onClick={() => Router.push({
                pathname: Routes.get(Routes.Main.QuestionsDetail.route, {
                  id: question.id,
                })
              })} >
                <Heading fontSize={"1.5rem"} fontWeight={"normal"}>
                  {question?.title}
                </Heading>
              </Link>
              <Text >
                {question?.questionBody}
              </Text>
              <Flex justifyContent={"space-between"} w="100%">
                <Text>
                  {question?.tags}
                </Text>
                <Text>
                  {question?.Users?.name} {moment().diff(moment(question?.createdAt), "hours")} hours ago
                </Text>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>)}
    </Stack>
  </Box>;
};

export default Questions;
