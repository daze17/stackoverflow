import type { NextPage } from "next";
import { Heading, Text, Box } from "@chakra-ui/react";

const Tags: NextPage = () => {
  return <Box>
    <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
      Tags
    </Heading >
    <Text>
      A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
    </Text>
  </Box>;
};

export default Tags;
