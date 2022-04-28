import React from 'react'
import { Box, Flex, Text, Icon, Heading } from '@chakra-ui/react'
import { BiUpArrow, BiDownArrow, } from 'react-icons/bi'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import QuestionComment from './questionComment';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useRouter } from 'next/router'
import moment from 'moment';



const QuestionBody = ({ questionData }: any) => {
    const router = useRouter()
    const questionId: any = router?.query?.id

    const { data: commentList, loading, refetch } = useQuery(gql`
    query COMMENT_LIST($input: CommentsInput) {
        answer(input: $input) {
          id
          commentBody
          vote
          createdAt
          updatedAt
        }
      }
  `, {
        variables: { input: { questionId: parseInt(questionId) } }
    });

    const [addComment] = useMutation(gql`
    mutation ADD_COMMENT($input: AddCommentInput) {
        addComment(input: $input)
      }
      `, {
        fetchPolicy: "no-cache",
        onCompleted: async (data: any) => {
            refetch()
        },
        onError: (error) => console.log(error, 'failed'),
    });

    const onSubmit = (values: any) => {
        const { commentBody } = values
        addComment({
            variables: {
                input: {
                    commentBody,
                    questionId: parseInt(questionId)
                }
            },
        });
    }

    return (
        <Box w={"100%"}>
            <Flex>
                <Box display="flex" flexDirection="column" alignItems="center" paddingRight="16px" color="#babfc4">
                    <Icon as={BiUpArrow} w={9} h={9} cursor="pointer" onClick={() => console.log('hi')} />
                    <Text fontSize={'21px'}>0</Text>
                    <Icon as={BiDownArrow} w={9} h={9} cursor="pointer" onClick={() => console.log('hi')} />
                    <Icon as={BsFillBookmarkStarFill} w={5} h={5} cursor="pointer" onClick={() => console.log('hi')} />
                </Box>
                <Box marginLeft={"5px"} minH="500px" w={"100%"} >
                    <Text>
                        {questionData?.questionBody}
                    </Text>
                </Box>

            </Flex>
            <Heading fontSize={"1.7rem"} fontWeight={"normal"} mb={"8px"}>
                Answers
            </Heading >
            <Box marginLeft={"5px"} borderBottom='1px' borderColor='gray.200' w={"100%"} >
                {!loading && commentList.answer.map((item: any, index: number) =>
                    <Box minH="100px" borderTop='1px' borderColor='gray.200' w={"100%"} key={index}>
                        <Flex justifyContent={"space-between"}>

                            <Text>
                                {item.commentBody}
                            </Text>
                            <Text align={"end"}>
                                {questionData?.Users?.name}<br/>
                                {moment(item.createdAt).format('LT')}
                            </Text>
                        </Flex>
                    </Box>)}
            </Box>
            <QuestionComment onSubmit={onSubmit} />
        </Box>
    )
}

export default QuestionBody