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
  useClipboard,
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

const MeditationChat = ({ selectedRoom, setSelectedRoom }) => {
  const [messages, setMessages] = useState([]);
  const [messageTxt, setMessageTxt] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [value, setValue] = React.useState("Hello world");
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
        scrollToBottom();
      });

    return () => messagesListener();
  }, []);

  return (
    <Flex direction="column" h="full">
      <Box my={4} />

      <Flex px={0} direction="column">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Flex
              key={index.toString()}
              justify={
                msg.user.uid === currentUser?.uid ? "flex-end" : "flex-start"
              }
              my={2}
            >
              {msg.user.uid !== currentUser?.uid && (
                <Flex direction="column" align="center" justify="center">
                  <Box borderRadius={"50%"} borderWidth={2} p={1}>
                    <Image
                      src={msg.user.avatar}
                      width="30px"
                      height="30px"
                      borderRadius={"40%"}
                    />
                  </Box>
                  <Text>{msg.user.displayName}</Text>
                </Flex>
              )}
              <Box mx={1} />
              <Text
                p={3}
                px={4}
                borderRadius={24}
                bg={
                  msg.user.uid === currentUser?.uid ? "brand.100" : "brand.400"
                }
                color="blackAlpha.800"
              >
                {msg.messageTxt}
              </Text>
              <Box mx={1} />

              {msg.user.uid === currentUser?.uid && (
                <Box>
                  <Box borderRadius={"50%"} borderWidth={2} p={1}>
                    <Image
                      src={msg.user.avatar}
                      width="30px"
                      height="30px"
                      borderRadius={"40%"}
                    />
                  </Box>

                  <Text>{msg.user.displayName}</Text>
                </Box>
              )}

              {index === messages.length - 1 && <div ref={messagesEndRef} />}
            </Flex>
          ))
        ) : (
          <Flex w="full" justify="center" align="center" direction="column">
            <Text textAlign="center" fontWeight="medium" fontSize={18} mx={8}>
              Invite More by Copying the Room Code Below:
            </Text>

            <Box mt={4} />
            <Flex justify="flex-start" w="full">
              <Input value={selectedRoom.id} />

              <Button
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.800" }}
                onClick={onCopy}
                ml={2}
              >
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
          </Flex>
        )}
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
