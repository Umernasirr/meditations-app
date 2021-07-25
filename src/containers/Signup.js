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
  AiOutlineUser,
} from "react-icons/all";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  const history = useHistory();

  const onChange = (e) => {
    setFormData({ ...formData, [e.name]: e.value });
  };

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
          Signup
        </Text>

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineUser />
          </InputLeftElement>

          <Input
            name="name"
            onChange={(e) => onChange(e.target)}
            borderColor="gray.300"
            placeholder="Enter your Name"
          />
        </InputGroup>

        <Flex w="80%" align="left">
          <Text color="red.700">{nameError}</Text>
        </Flex>

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineMail />
          </InputLeftElement>

          <Input
            name="email"
            borderColor="gray.300"
            placeholder="Enter your Email"
            onChange={(e) => onChange(e.target)}
          />
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
            name="password"
            borderColor="gray.300"
            placeholder="Enter your Password"
            onChange={(e) => onChange(e.target)}
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

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineKey onClick={() => setShowPassword(!showPassword)} />
          </InputLeftElement>

          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            borderColor="gray.300"
            placeholder="Confirm your Password"
            onChange={(e) => onChange(e.target)}
          />

          <InputRightElement px={2}>
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <AiOutlineEye
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </InputRightElement>
        </InputGroup>

        <Flex w="80%" align="left">
          <Text color="red.700">{passwordError}</Text>
        </Flex>

        <Box my={3} />

        <Button width="120px" colorScheme="facebook" onClick={handleSubmit}>
          SignUp
        </Button>

        <Box my={3} />

        <Flex w="full" justify="center">
          <Text pr={1}>Already have an account?</Text>
          <Button
            variant="link"
            _focus={{ outline: "none" }}
            color="facebook.300"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
