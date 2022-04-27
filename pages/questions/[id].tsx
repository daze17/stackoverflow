import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import QuestionHeader from "@app/components/questionDetail/questionHeader";
import QuestionBody from "@app/components/questionDetail/questionBody";

const QuestionDetails = () => {
  const router = useRouter()
  const questionId: any = router?.query?.id
  const { data: question, loading } = useQuery(gql`
    query QUESTION_DETAIL($input: questionDetailInput) {
      questionDetail(input: $input) {
        title
        tags
        status
        id
        questionBody
        createdAt
        Users {
          name
          id
          email
        }
      }
    }
  `, {
    variables: { input: { questionId: parseInt(questionId) } }
  }
  );
  return !loading && <>
    <QuestionHeader data={question?.questionDetail} />
    <Grid
      h='200px'
      templateColumns='repeat(3, 1fr)'
      gap={4}
    >
      <GridItem colSpan={2} >
          <QuestionBody data={question?.questionDetail} />
      </GridItem>
      <GridItem colSpan={1}  >
        <Box boxShadow='md'>
          <Box p={"16px"} bg={"#fbf3d5"} >
            The Overflow Blog
          </Box>
          <Box p={"16px"} bg={"#fdf7e2"}>
            <Text>
              Episode 436: Meet the design system that lets us customize and theme Stack...
            </Text>
            <br />
            <Text>
              Underscoring (or dunder-scoring) the importance of native type methods in...
            </Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  </>;
};

export default QuestionDetails;
