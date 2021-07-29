import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";

import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import MeditationChat from "./MeditationChat";

const ChatMessagesPopup = ({
  isDrawerOpen,
  setDrawerOpen,
  selectedRoom,
  setSelectedRoom,
}) => {
  return (
    <Flex px={8}>
      <Popover placement="top" isOpen={isDrawerOpen}>
        <PopoverTrigger>
          <IconButton
            bg="brand.600"
            width="80px"
            color="white"
            _hover={{ bg: "brand.800" }}
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            _focus={{ outline: "none" }}
            size="lg"
            icon={<AiOutlineMessage size="24" />}
          />
        </PopoverTrigger>
        <PopoverContent bg="transparent" border="none">
          <PopoverBody bg="gray.100" borderRadius={16}>
            <Box py={2} />
            <Flex
              w="full"
              color="brand.600"
              boxShadow="sm"
              justify="center"
              align="center"
              pb={2}
            >
              <Text>
                {selectedRoom.title} - {selectedRoom.id}
              </Text>
            </Flex>
            <Box py={2} />

            <Flex
              direction="column"
              overflowY
              height="460px"
              overflow="scroll"
              css={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#6269A0",
                  borderRadius: "16px",
                },
              }}
            >
              {selectedRoom && (
                <Flex h="full">
                  <MeditationChat
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                  />
                </Flex>
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ChatMessagesPopup;