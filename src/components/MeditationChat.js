import React, { useState, useEffect, useRef } from "react";
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
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  AiOutlineCloseCircle,
  AiOutlineMessage,
  AiOutlineArrowRight,
  BiGroup,
} from "react-icons/all";

import firebase from "../firebase";
import { useSelector } from "react-redux";

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const MeditationChat = ({ selectedChat, setSelectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [messageTxt, setMessageTxt] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const roomsRef = firebase.firestore().collection("rooms");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartMeditation = () => {
    // scrollToBottom();
  };

  const handleCloseChat = () => {
    setSelectedChat(undefined);
  };

  const handleSubmitMessage = () => {
    if (messageTxt !== "") {
      roomsRef.doc(selectedChat.id).collection("messages").add({
        messageTxt,
        createdAt: new Date().getTime(),
        user_id: currentUser.uid,
        //  user: {
        //    _id: currentUser.uid,
        //    email: currentUser.email,
        //  },
      });
      scrollToBottom();
      setMessageTxt("");
    }
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
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        setMessages(messages);
        scrollToBottom();
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
          <Tooltip label="Start the Meditation" aria-label="A tooltip">
            <IconButton
              onClick={handleStartMeditation}
              variant="ghost"
              _focus={{ outline: "none" }}
              fontSize={24}
              icon={<AiOutlineArrowRight />}
            />
          </Tooltip>

          <Box mx={2} />
          <Tooltip label="View Members" aria-label="A tooltip">
            <IconButton
              onClick={handleStartMeditation}
              variant="ghost"
              _focus={{ outline: "none" }}
              fontSize={24}
              icon={<BiGroup />}
            />
          </Tooltip>

          <Box mx={2} />
          <Tooltip label="Exit Group" aria-label="A tooltip">
            <IconButton
              onClick={handleCloseChat}
              variant="ghost"
              _focus={{ outline: "none" }}
              fontSize={24}
              icon={<AiOutlineCloseCircle />}
            />
          </Tooltip>
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
          messages.map((msg, index) => (
            <Flex
              justify={
                msg.user_id === currentUser?.uid ? "flex-end" : "flex-start"
              }
              my={2}
            >
              {msg.user_id !== currentUser?.uid && (
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
                bg={
                  msg.user_id === currentUser?.uid ? "gray.200" : "linkedin.100"
                }
                color="blackAlpha.800"
              >
                {msg.messageTxt}
              </Text>
              <Box mx={1} />

              {msg.user_id === currentUser?.uid && (
                <Box borderRadius={"50%"} borderWidth={2} p={1}>
                  <Image
                    src={groupImg}
                    width="40px"
                    height="40px"
                    borderRadius={"40%"}
                  />
                </Box>
              )}

              {index === messages.length - 1 && <div ref={messagesEndRef} />}
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

export default MeditationChat;
