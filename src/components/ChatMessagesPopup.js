import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import React from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { setUser } from "../redux/user";
import MeditationChat from "./MeditationChat";

const ChatMessagesPopup = ({
  isDrawerOpen,
  setDrawerOpen,
  selectedRoom,
  setSelectedRoom,
  showLeaveGroupModal,
  setShowLeaveGroupModal,
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
              justify="space-between"
              align="center"
              px={2}
              pb={2}
            >
              <Text>
                {selectedRoom.title} - {selectedRoom.id}
              </Text>
              {/* {icon} */}
              <IconButton
                ml={2}
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.800" }}
                onClick={() => setShowLeaveGroupModal(!showLeaveGroupModal)}
                _focus={{ outline: "none" }}
                size="md"
                borderRadius={32}
                icon={<AiOutlineClose size="18" />}
              />
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
