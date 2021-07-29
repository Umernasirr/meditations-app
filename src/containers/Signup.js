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
import md5 from "md5";
import firebase from "../firebase";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userRef, _] = useState(firebase.firestore().collection("users"));

  const { name, email, password, confirmPassword } = formData;
  const history = useHistory();

  const onChange = (e) => {
    setFormData({ ...formData, [e.name]: e.value });
  };

  const isFormEmpty = () => {
    return (
      !name.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    let errorsArray = [];
    let error;
    setErrors([]);
    if (isFormEmpty()) {
      error = { message: "Fill in all fields" };
      setErrors([error]);
      return false;
    } else if (!isPasswordValid()) {
      error = { message: "Password is not valid" };
      setErrors([error]);
      return false;
    } else {
      errorsArray = [];
      setErrors([]);
      return true;
    }
  };

  const saveUser = (createdUser) => {
    return userRef.doc(createdUser.user.uid).set({
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (e) => {
    if (isFormValid()) {
      setErrors([]);
      e.preventDefault();

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: name,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser)
                .then(() => {
                  // history.push("/login");
                  // setErrors([]);
                })
                .catch((err) => {
                  setErrors([err]);
                });
            })
            .catch((err) => {
              setErrors([err]);
            });
        })
        .catch((err) => {
          setErrors([err]);
        });
    }
  };

  const displayErrors = () => {
    return (
      errors &&
      errors.map((error, index) => (
        <Flex key={index.toString()} w="80%" align="left" p={1}>
          <Text color="red.700">* {error.message}</Text>
        </Flex>
      ))
    );
  };

  return (
    <Flex h="full" w="full" bg="gray.900" align="center" justify="center">
      <Flex
        w="30%"
        h="60%"
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
            value={name}
            placeholder="Enter your Name"
          />
        </InputGroup>

        <Box my={2} />
        <InputGroup w="80%">
          <InputLeftElement px={2}>
            <AiOutlineMail />
          </InputLeftElement>

          <Input
            name="email"
            borderColor="gray.300"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => onChange(e.target)}
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
            borderColor="gray.300"
            value={password}
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
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

        {errors.length > 0 && displayErrors()}
        <Box my={2} />

        <Button
          width="120px"
          bg="brand.600"
          color="gray.100"
          _hover={{ backgroundColor: "brand.800" }}
          onClick={handleSubmit}
        >
          SignUp
        </Button>

        <Box my={2} />

        <Flex w="full" justify="center">
          <Text pr={1}>Already have an account?</Text>
          <Button
            variant="link"
            _focus={{ outline: "none" }}
            color="brand.600"
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
