import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Flex,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineKey,
  AiOutlineMail,
} from "react-icons/all";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const { email, password } = formData;

  const handleForgetPassword = () => {};

  const handleCreateAccount = () => {};

  const handleSubmit = () => {
    console.log("Clicked");
  };

  return (
    <Flex h="full" w="full" bg="gray.900" align="center" justify="center">
      <Flex
        w="30%"
        h="50%"
        bg="white"
        align="center"
        justify="center"
        borderRadius={16}
        direction="column"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>
        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineMail onClick={() => setShowPassword(!showPassword)} />
          </InputLeftElement>

          <Input borderColor="gray.300" placeholder="Enter your Email" />
        </InputGroup>

        <Flex w="80%" align="left">
          <Text color="red.700">{emailError}</Text>
        </Flex>

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineKey onClick={() => setShowPassword(!showPassword)} />
          </InputLeftElement>

          <Input
            type={showPassword ? "text" : "password"}
            borderColor="gray.300"
            placeholder="Enter your Password"
          />

          <InputRightElement px={2}>
            {showPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye onClick={() => setShowPassword(!showPassword)} />
            )}
          </InputRightElement>
        </InputGroup>

        <Flex w="80%" align="left">
          <Text color="red.700">{passwordError}</Text>
        </Flex>

        <Box my={3} />

        <Button width="120px" colorScheme="facebook" onClick={handleSubmit}>
          Login
        </Button>

        <Box my={3} />

        <Flex w="full" justify="center">
          <Text pr={1}>Don't have an account?</Text>
          <Button
            variant="link"
            _focus={{ outline: "none" }}
            color="facebook.300"
            onClick={() => history.push("/signup")}
          >
            Signup
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
