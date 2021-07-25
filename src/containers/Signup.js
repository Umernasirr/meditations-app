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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userRef, setUserRef] = useState(
    firebase.firestore().collection("users")
  );

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
    console.log(errors, "error");
    console.log(password, "pass");
    if (isFormEmpty()) {
      error = { message: "Fill in all fields" };
      setErrors(errorsArray.concat(error));
      return false;
    } else if (!isPasswordValid()) {
      console.log("not");
      error = { message: "Password is not valid" };
      setErrors(errorsArray.concat(error));
      return false;
    } else {
      errorsArray = [];
      setErrors([]);
      console.log("coming", errors);
      return true;
    }
  };
  const handleForgetPassword = () => {};

  const handleCreateAccount = () => {};

  const saveUser = (createdUser) => {
    return userRef.doc(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (e) => {
    if (isFormValid()) {
      e.preventDefault();
      setErrors([]);
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
                  console.log("user created");
                })
                .catch((err) => {
                  setErrors(errors.concat(err));
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              setErrors(errors.concat(err));
            });
        })
        .catch((err) => {
          setErrors(errors.concat(err));
          console.log(err);
        });
    }
  };

  const displayErrors = () => {
    return errors.map((error, i) => (
      <Flex w="80%" align="left" p={1}>
        <Text color="red.700">* {error.message}</Text>
      </Flex>
    ));
  };

  return (
    <Flex h="full" w="full" bg="gray.900" align="center" justify="center">
      <Flex
        w="30%"
        // h="50%"
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

        <Flex w="80%" align="left">
          <Text color="red.700">{passwordError}</Text>
        </Flex>

        {displayErrors()}
        <Box my={2} />

        <Button width="120px" colorScheme="facebook" onClick={handleSubmit}>
          SignUp
        </Button>

        <Box my={1} />

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
