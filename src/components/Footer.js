import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex w="full" h="30px" align="center" justify="center">
      <Text fontSize="0.8em" color="blackAlpha.700">
        &copy; 2021 - Meditation App | All Rights Reserved
      </Text>
    </Flex>
  );
};

export default Footer;
