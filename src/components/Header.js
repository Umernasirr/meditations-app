import { Flex, Text, Box, Button, Image } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../firebase.js";
import { clearUser } from "../redux/user.js";
const logoImg = process.env.PUBLIC_URL + "/logo.png";

const Header = ({ setShowJoinModal }) => {
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
      bg="facebook.500"
      align="center"
      justify="space-between"
      color="white"
    >
      <Flex align="center" px={12}>
        <Image src={logoImg} width="40px" height="50px" />
        <Box mx={2} />
        <Text fontSize="md" fontWeight="medium" letterSpacing="1.2">
          <Link href="/">Meditation App</Link>
        </Text>
      </Flex>

      <Flex align="center" px={12}>
        <Button
          variant="link"
          _focus={{ outline: "none" }}
          color="white"
          onClick={() => handleJoinRoom()}
        >
          Join A Room
        </Button>
        {!currentUser && (
          <Fragment>
            <Box mx={4} />
            <Button
              onClick={() => history.push("/login")}
              variant="link"
              _focus={{ outline: "none" }}
              color="white"
            >
              Login
            </Button>
          </Fragment>
        )}
        <Box mx={4} />

        <Button
          width="100px"
          variant="solid"
          borderRadius={32}
          onClick={() =>
            currentUser ? logoutHandler() : history.push("/signup")
          }
          bg="white"
          _focus={{ outline: "none" }}
          color="facebook.500"
        >
          {currentUser ? "Logout" : "Register"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
