import React, { useState, useEffect } from "react";

import {
  Flex,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";

import Header from "../components/Header";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";
import { AiOutlineMessage } from "react-icons/ai";
import firebase from "../firebase";
import { useSelector } from "react-redux";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [roomName, setRoomName] = useState("");

  const [rooms, setRooms] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const roomsRef = firebase.firestore().collection("rooms");
  const handleRoomCreate = () => {
    setShowModal(false);
    roomsRef
      .doc()
      .set({
        title: roomName,
        members: [currentUser],
      })
      .then((res) => console.log("Room Created"));

    setRoomName("");
  };

  const handleJoinRoom = () => {
    setRoomName("");
  };

  useEffect(() => {
    return roomsRef.onSnapshot((snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        roomsData.push({ ...doc.data(), id: doc.id });
      });

      console.log(roomsData);
      setRooms(roomsData);
    });
  }, []);

  return (
    <Flex h="100vh" w="100vw" bg="gray.100" direction="column">
      <Header setShowJoinModal={setShowJoinModal} />
      {/* Join Room Model */}
      <Modal
        size="xl"
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      >
        <ModalContent>
          <ModalHeader>Join an Existing Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement>
                <AiOutlineMessage />
              </InputLeftElement>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room Name"
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setShowJoinModal(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="facebook" onClick={() => handleJoinRoom()}>
              Join Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create New Room Modal */}
      <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader>New Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement>
                <AiOutlineMessage />
              </InputLeftElement>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room Name"
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="facebook" onClick={() => handleRoomCreate()}>
              Create New Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box mt={8} />

      <Flex mx={24} direction="column" h="full">
        <Flex align="center" justify="space-between">
          <Text fontSize="2xl" fontWeight="medium">
            Chats
          </Text>

          <Button
            colorScheme="facebook"
            variant="outline"
            _focus={{ outline: "none" }}
            onClick={() => setShowModal(true)}
          >
            Create A New Room
          </Button>
        </Flex>

        <Box mt={4} />

        <Grid w="full" h="full" templateColumns="repeat(4, 1fr)" gap={2}>
          <GridItem colSpan={1} h="95%" bg="gray.100" boxShadow="sm">
            {rooms && (
              <ChatList rooms={rooms} setSelectedChat={setSelectedChat} />
            )}
          </GridItem>
          <GridItem colSpan={3} h="95%" boxShadow="sm">
            {selectedChat && (
              <ChatContainer
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Rooms;
