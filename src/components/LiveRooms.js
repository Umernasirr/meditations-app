import React from "react";

import { Flex, Text, IconButton, Tooltip } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";

const ROOMS = [1, 2, 3, 4, 5];

const LiveRooms = ({ rooms }) => {
  const handleClick = () => {};
  return (
    <Flex w="60%" direction="column">
      {ROOMS.map((room) => (
        <Flex
          onClick={() => handleClick}
          _hover={{
            borderColor: "brand.600",
          }}
          p={2}
          px={4}
          my={1}
          bg="white"
          borderRadius={16}
          boxShadow="xs"
          borderColor="brand.400"
          borderWidth={2}
          align="center"
          justify="space-between"
        >
          <Text>Room Name</Text>

          <Tooltip label="Join Room" fontSize="sm" placement="top">
            <IconButton
              bg="transparent"
              _hover={{
                borderColor: "brand.100",
                borderWidth: 2,
              }}
              borderRadius={8}
              _focus={{ outline: "none" }}
              icon={<AiOutlineArrowRight />}
            />
          </Tooltip>
        </Flex>
      ))}
    </Flex>
  );
};

export default LiveRooms;
