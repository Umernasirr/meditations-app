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
import firebase from "../firebase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const { email, password } = formData;

  const isFormValid = () => email && password;
  const onChange = (e) => {
    setFormData({ ...formData, [e.name]: e.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          history.push("/rooms");
        })
        .catch((err) => {
          console.log(err);
          setErrors([err]);
        });
    } else {
      setErrors([{ message: "Please fill the fields" }]);
    }
  };

  const displayErrors = () => {
    return (
      errors &&
      errors.map((error, i) => (
        <Flex key={i.toString()} w="80%" align="left" p={1}>
          <Text color="red.700">* {error.message}</Text>
        </Flex>
      ))
    );
  };

  return (
    <Flex h="full" w="full" bg="gray.900" align="center" justify="center">
      <Flex
        w="30%"
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

          <Input
            value={email}
            name="email"
            onChange={(e) => onChange(e.target)}
            borderColor="gray.300"
            placeholder="Enter your Email"
          />
        </InputGroup>

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineKey onClick={() => setShowPassword(!showPassword)} />
          </InputLeftElement>

          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
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
        {errors.length > 0 && displayErrors()}
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
