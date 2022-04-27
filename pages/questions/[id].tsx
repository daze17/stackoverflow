import QuestionHeader from "@app/components/questionDetail/questionHeader";
import type { NextPage } from "next";
import { Grid, GridItem } from "@chakra-ui/react";
import QuestionBody from "@app/components/questionDetail/questionBody";

const QuestionDetail: NextPage = () => {
  return <>
    <QuestionHeader />
    <Grid
      h='200px'
      templateColumns='repeat(3, 1fr)'
      gap={4}
    >
      <GridItem colSpan={2} >
        <QuestionBody />
      </GridItem>
      <GridItem colSpan={1} bg='papayawhip' />
    </Grid>
  </>;
};

export default QuestionDetail;
