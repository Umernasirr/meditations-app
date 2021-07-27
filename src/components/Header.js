import { Flex, Text, Box, Button, Image, IconButton } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../firebase.js";
import { clearUser } from "../redux/user.js";
import { AiOutlineMenu } from "react-icons/ai";
const logoImg = process.env.PUBLIC_URL + "/logo.png";

const Header = ({ setShowJoinModal, setDrawerOpen, setShowModal, hasBg }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleJoinRoom = () => {
    if (currentUser) {
      setShowJoinModal(true);
    } else {
      history.push("/login");
    }
  };
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(clearUser);
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });
  };
  return (
    <Flex
      w="full"
      height="60px"
      bg={hasBg ? "brand.800" : "transparent"}
      align="center"
      justify="space-between"
      color="white"
      py={8}
    >
      <Flex align="center" px={12}>
        {!hasBg && (
          <IconButton
            variant="ghost"
            color="brand.100"
            _hover={{ backgroundColor: "transparent", color: "brand.200 " }}
            fontSize={22}
            onClick={() => setDrawerOpen(true)}
            _focus={{ outline: "none" }}
            icon={<AiOutlineMenu />}
          />
        )}
        <Box mx={2} />
        <Text
          fontSize="md"
          fontWeight="medium"
          color="gray.100"
          letterSpacing="1.2"
        >
          Meditate App
        </Text>
      </Flex>

      <Flex align="center" px={12}>
        <Button
          variant="link"
          _focus={{ outline: "none" }}
          color="gray.100"
          onClick={() => handleJoinRoom()}
        >
          Join A Room
        </Button>

        <Fragment>
          <Box mx={4} />
          <Button
            onClick={() =>
              !currentUser ? history.push("/login") : setShowModal(true)
            }
            variant="link"
            _focus={{ outline: "none" }}
            color="gray.100"
          >
            {!currentUser ? "Login" : "Create New Room"}
          </Button>
        </Fragment>

        <Box mx={4} />

        <Button
          width="100px"
          variant="solid"
          borderRadius={32}
          onClick={() =>
            currentUser ? logoutHandler() : history.push("/signup")
          }
          bg="gray.100"
          _focus={{ outline: "none" }}
          color="blackAlpha.800"
        >
          {currentUser ? "Logout" : "Register"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
