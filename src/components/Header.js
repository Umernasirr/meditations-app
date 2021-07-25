import { Flex, Text, Box, Button, Image } from "@chakra-ui/react";
import React from "react";
const logoImg = process.env.PUBLIC_URL + "/logo.png";

const Header = () => {
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
          Meditation App
        </Text>
      </Flex>

      <Flex align="center" px={12}>
        <Button variant="link" _focus={{ outline: "none" }} color="white">
          Join A Room
        </Button>
        <Box mx={4} />

        <Button variant="link" _focus={{ outline: "none" }} color="white">
          Login
        </Button>
        <Box mx={4} />

        <Button
          width="100px"
          variant="solid"
          borderRadius={32}
          bg="white"
          _focus={{ outline: "none" }}
          color="facebook.500"
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
