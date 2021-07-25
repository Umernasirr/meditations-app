import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";

const Login = () => {
  return (
    <Flex h="full" w="full" bg="gray.200" align="center" justify="center">
      <Button bg="brand.900" color="white">
        CLick Me
      </Button>
    </Flex>
  );
};

export default Login;
