import type { NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  Box
} from "@chakra-ui/react";
import Routes from "@app/routes/routers";
import Router from "next/router";
import { Formik, Form } from "formik";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import config from "@app/config";
import { gql } from "apollo-boost";

const Login: NextPage = () => {
  const apolloClient = useApolloClient();
  // Mutations
  const [loginMutation] = useMutation(gql`mutation LOGIN($input: LoginInput) {
    login(input: $input){
      accessToken
    }
  }`, {
    fetchPolicy: "no-cache",
    onCompleted: async (data: any) => {
      try {
        Cookies.set(
          config.TOKEN_KEY,
          data?.login?.accessToken,
          {
            expires: 1,
            httpOnly: false,
            secure: false,
            path: "/",
          }
        );

        await apolloClient.cache.reset();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log(error, 'login failed'),
  });

  const onSubmit = (values: any) => {
    localStorage.removeItem("credentials");
    loginMutation({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
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
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <Flex justifyContent={"space-between"}>

                      <FormLabel>Password</FormLabel>

                      <Link color={'blue.500'}>Forgot password?</Link>
                    </Flex>
                    <Input
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
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
                          Log in
                        </Button>
                      </Flex>
                    </Stack>
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
          <Text align="center">
            Don’t have an account? <Link color="blue" textDecor="underline" onClick={() =>
              Router.push(Routes.Additional.Register.route)
            }>Sign up</Link>
          </Text>
          <Text align="center">Are you an employer? <Link color="blue" textDecor="underline">Sign up on Talent</Link>  </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Login