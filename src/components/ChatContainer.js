import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Spacer,
} from "@chakra-ui/react";
import {
  AiOutlineCloseCircle,
  AiOutlineMessage,
  AiOutlineSearch,
} from "react-icons/ai";

import firebase from "../firebase";

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const ChatContainer = ({ selectedChat, setSelectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [messageTxt, setMessageTxt] = useState("");

  const roomsRef = firebase.firestore().collection("rooms");

  const handleSearch = () => {};

  const handleCloseChat = () => {
    setSelectedChat(undefined);
  };

  const handleSubmitMessage = () => {
    roomsRef.doc(selectedChat.id).collection("messages").add({
      messageTxt,
      createdAt: new Date().getTime(),
      user_id: 99,
      //  user: {
      //    _id: currentUser.uid,
      //    email: currentUser.email,
      //  },
    });
  };

  useEffect(() => {
    setMessages([]);
    const messagesListener = roomsRef
      .doc(selectedChat.id)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, [selectedChat]);

  return (
    <Flex direction="column" bg="white" w="full" h="full">
      {/* Top Row */}
      <Flex
        justify="space-between"
        align="center"
        px={12}
        py={2}
        boxShadow="base"
      >
        <Flex align="center">
          <Box borderRadius={"50%"} borderWidth={2} p={1}>
            <Image
              src={groupImg}
              width="40px"
              height="40px"
              borderRadius={"40%"}
            />
          </Box>

          <Box mx={2} />
          <Text fontWeight="bold" color="blackAlpha.700">
            {selectedChat.title}
          </Text>

          <Text fontWeight="bold" color="blackAlpha.700">
            {" - " + selectedChat.id}
          </Text>
        </Flex>

        <Flex>
          <Icon onClick={handleSearch} fontSize={24} as={AiOutlineSearch} />
          <Box mx={2} />
          <Icon
            onClick={handleCloseChat}
            fontSize={24}
            as={AiOutlineCloseCircle}
          />
        </Flex>
      </Flex>

      <Box my={4} />

      <Flex
        px={12}
        direction="column"
        overflowY="scroll"
        maxHeight="400px"
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
        {messages.length > 0 &&
          messages.map((msg) => (
            <Flex
              justify={msg.user_id === 99 ? "flex-end" : "flex-start"}
              my={2}
            >
              {msg.user_id !== 99 && (
                <Box borderRadius={"50%"} borderWidth={2} p={1}>
                  <Image
                    src={groupImg}
                    width="40px"
                    height="40px"
                    borderRadius={"40%"}
                  />
                </Box>
              )}
              <Box mx={1} />
              <Text
                p={3}
                px={4}
                borderRadius={24}
                bg={msg.user_id === 99 ? "gray.200" : "linkedin.100"}
                color="blackAlpha.800"
              >
                {msg.messageTxt}
              </Text>
              <Box mx={1} />

              {msg.user_id === 99 && (
                <Box borderRadius={"50%"} borderWidth={2} p={1}>
                  <Image
                    src={groupImg}
                    width="40px"
                    height="40px"
                    borderRadius={"40%"}
                  />
                </Box>
              )}
            </Flex>
          ))}
      </Flex>
      <Spacer />
      <Box py={2} />
      <InputGroup px={2}>
        <InputLeftElement pl={2} children={<AiOutlineMessage />} />
        <Input
          value={messageTxt}
          onChange={(e) => setMessageTxt(e.target.value)}
          placeholder="Write a New Message"
        />
        <Box mx={1} />
        <Button
          onClick={handleSubmitMessage}
          _focus={{ outline: "none" }}
          colorScheme="facebook"
        >
          Submit
        </Button>
      </InputGroup>
      <Box my={1} />
    </Flex>
  );
};

export default ChatContainer;
