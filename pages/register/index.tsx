import type { NextPage } from "next";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  useToast,
  Box
} from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router from "next/router";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Register: NextPage = () => {
  // Mutations
  const [registerMutation] = useMutation(gql`mutation 
  REGISTER($input: UserInput) {
    addUser(input: $input)
  }`, {
    fetchPolicy: "no-cache",
    onCompleted: async () => {
      Router.push(Routes.Additional.Login.route);
      // showSuccess("Registered successfully", toast);
    },
    onError: (error) => console.log(error, 'error'),
  });

  const onSubmit = (values: any) => {
    console.log(values, "ayo bitches");
    registerMutation({
      variables: {
        input: {
          email: values.email,
          password: values.password,
          name: values.name,
        }
      },
    });
  };
  const formValidate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values?.password) {
      errors.password = "No password";
    }
    return errors;
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"285px"} maxW={"md"}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={formValidate}
            onSubmit={onSubmit}

          >
            {({ handleChange, handleBlur }: any) => (
              <Form>
                <Box bg="white" p="30px">
                  <FormControl id="name">
                    <FormLabel>Display Name</FormLabel>
                    <Input
                      type="displayname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <Text>
                    Passwords must contain at least eight characters, including at least 1 letter and 1 number.
                  </Text>
                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                    </Stack>
                    <Stack>
                      <Flex flex={1} justify={"space-between"}>
                        <Button colorScheme={"blue"} type="submit" width={"100%"}>
                          Sign up
                        </Button>
                      </Flex>
                    </Stack>
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
          <Text align="center">
            Already have an account? <Link color="blue" textDecor="underline" onClick={() =>
              Router.push(Routes.Additional.Login.route)
            }>Log in</Link>
          </Text>
          <Text align="center">Are you an employer? <Link color="blue" textDecor="underline">Sign up on Talent</Link>  </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Register;

