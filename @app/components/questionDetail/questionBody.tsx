import React from 'react'
import { Box, Button, Flex, Stack, Text, IconButton, Icon } from '@chakra-ui/react'
import { BiUpArrow, BiDownArrow, } from 'react-icons/bi'
import { BsFillBookmarkStarFill } from 'react-icons/bs'

const   QuestionBody = ({ data }: any) => {
    return (
        <Box w={"100%"} >
            <Flex>
                <Box display="flex" flexDirection="column" alignItems="center" paddingRight="16px" color="#babfc4">
                    {/* <IconButton
                        aria-label='upvote'
                        size='lg'
                        p={0}
                        icon={<BiUpArrow />}
                    /> */}
                    <Icon as={BiUpArrow} w={9} h={9} cursor="pointer" onClick={() => console.log('hi')} />
                    <Text fontSize={'21px'}>0</Text>
                    <Icon as={BiDownArrow} w={9} h={9} cursor="pointer" onClick={() => console.log('hi')} />
                    <Icon as={BsFillBookmarkStarFill} w={5} h={5} cursor="pointer" onClick={() => console.log('hi')} />
                    <Icon as={BsFillBookmarkStarFill} w={5} h={5} cursor="pointer" onClick={() => console.log('hi')} />
                </Box>
                <Box marginLeft={"5px"} h="500px" bg={"yellow"} w={"100%"}>
                    {data?.questionBody}
                </Box>
            </Flex>
        </Box>
    )
}

export default QuestionBody