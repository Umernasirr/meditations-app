import { Flex, Text, Image, Box } from "@chakra-ui/react";
import React from "react";

import { CHATS } from "../constants";

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const ChatList = ({ setSelectedChat }) => {
  return (
    <Flex
      direction="column"
      maxHeight="560px"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#898F9C",
          borderRadius: "16px",
        },
      }}
    >
      {CHATS.map((chat) => (
        <Flex
          _hover={{ backgroundColor: "whiteAlpha.700", cursor: "pointer" }}
          onClick={() => setSelectedChat(chat)}
          p={3}
          my={0}
          align="center"
          bg="white"
          borderColor="gray.100"
          borderWidth={1}
        >
          <Box
            borderRadius={"50%"}
            borderColor="facebook.500"
            borderWidth={2}
            p={1}
          >
            <Image
              src={groupImg}
              width="40px"
              height="40px"
              borderRadius={"40%"}
            />
          </Box>

          <Box ml={3}>
            <Text fontWeight="bold">{chat.title}</Text>
            <Text fontSize="0.8em" color="gray.500">
              {chat.messages[chat.messages.length - 1].message.slice(0, 40)}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default ChatList;
