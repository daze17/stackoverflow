import React from 'react'
import { Box, Image, Flex, Text } from "@chakra-ui/react"

const UserCard = (user: any) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Flex justifyContent={"start"} >

                <Image w={"50px"} h={"50px"} src={"https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} alt={"memberimage"} />
                <Box>
                    <Text fontSize="11px" >{user?.user?.name}</Text>
                    <Text fontSize="9px" isTruncated >{user?.user?.email}</Text>
                    {/* <Text fontSize="11px" >point</Text>
                    <Text fontSize="9px"  >tag</Text> */}
                </Box>
            </Flex>
        </Box>
    )
}

export default UserCard