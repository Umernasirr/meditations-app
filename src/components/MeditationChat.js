import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Spacer,
  useClipboard,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/all";

import firebase from "../firebase";
import { useSelector } from "react-redux";

const MeditationChat = ({ selectedRoom, setSelectedRoom }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageTxt, setMessageTxt] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { hasCopied, onCopy } = useClipboard(
    selectedRoom.id ? selectedRoom.id : ""
  );

  const roomsRef = firebase.firestore().collection("rooms");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleSubmitMessage = () => {
    if (messageTxt !== "") {
      roomsRef.doc(selectedRoom.id).collection("messages").add({
        messageTxt,
        createdAt: new Date().getTime(),
        user: currentUser,
      });
      scrollToBottom();
      setMessageTxt("");
    }
  };

  useEffect(() => {
    setMessages([]);
    setLoading(true);
    const messagesListener = roomsRef
      .doc(selectedRoom.id)
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
        setLoading(false);
        scrollToBottom();
      });

    return () => messagesListener();
  }, [selectedRoom]);

  return (
    <Flex direction="column" h="full">
      <Flex px={0} direction="column">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Flex
              key={index.toString()}
              justify={
                msg.user.uid === currentUser?.uid ? "flex-end" : "flex-start"
              }
              my={1}
              align="center"
            >
              {msg.user.uid !== currentUser?.uid && (
                <Flex direction="column" justify="center" align="center">
                  <Box borderRadius={"50%"} borderWidth={0} p={1}>
                    <Image
                      src={msg.user.photoURL}
                      width="30px"
                      height="30px"
                      borderRadius={"40%"}
                    />
                  </Box>

                  <Text fontWeight="bold" fontSize={12}>
                    {msg.user.displayName && msg.user.displayName.split(" ")[0]}
                  </Text>
                </Flex>
              )}
              <Box mx={1} />
              <Flex
                borderRadius={24}
                bg={
                  msg.user.uid === currentUser?.uid ? "brand.100" : "brand.400"
                }
                color="blackAlpha.800"
                p={3}
              >
                <Text fontSize={14}>{msg.messageTxt}</Text>
              </Flex>
              <Box mx={1} />

              {msg.user.uid === currentUser?.uid && (
                <Flex direction="column" justify="center" align="center">
                  <Box borderRadius={"50%"} borderWidth={0} p={1}>
                    <Image
                      src={msg.user.photoURL}
                      width="30px"
                      height="30px"
                      borderRadius={"40%"}
                    />
                  </Box>

                  <Text fontWeight="bold" fontSize={12}>
                    {msg.user.displayName && msg.user.displayName.split(" ")[0]}
                  </Text>
                </Flex>
              )}

              {index === messages.length - 1 && <div ref={messagesEndRef} />}
            </Flex>
          ))
        ) : (
          <Flex w="full" justify="center" align="center" direction="column">
            <Text textAlign="center" fontWeight="medium" fontSize={18} mx={8}>
              Invite Friends by Copying the Room Code:
            </Text>

            <Box mt={4} />
            <Flex justify="flex-start" w="full">
              <Input
                value={selectedRoom.id}
                readOnly
                borderColor="brand.400"
                borderWidth={2}
              />

              <Button
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.800" }}
                onClick={onCopy}
                ml={1}
              >
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>

            <Box my={2} />
            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </Flex>
        )}
      </Flex>
      <Spacer />
      <Box py={2} />
      <InputGroup>
        <InputLeftElement pl={2} children={<AiOutlineMessage />} />
        <Input
          fontSize={12}
          value={messageTxt}
          onChange={(e) => setMessageTxt(e.target.value)}
          placeholder="Write a New Message"
        />
        <Box mx={1} />
        <Button
          onClick={handleSubmitMessage}
          _focus={{ outline: "none" }}
          bg="brand.600"
          color="white"
          _hover={{ bg: "brand.800" }}
        >
          Submit
        </Button>
      </InputGroup>
      <Box my={1} />
    </Flex>
  );
};

export default MeditationChat;
