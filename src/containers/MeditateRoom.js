import React, { useState, useEffect } from "react";

import {
  Flex,
  Box,
  Text,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  InputLeftElement,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

import Header from "../components/Header";

import { AiOutlineMessage } from "react-icons/ai";
import firebase from "../firebase";
import { useSelector } from "react-redux";
import MyDrawer from "../components/MyDrawer";
import ChatDrawer from "../components/ChatDrawer";

const MeditationRooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [roomName, setRoomName] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);

  const [rooms, setRooms] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const roomsRef = firebase.firestore().collection("rooms");
  const handleRoomCreate = () => {
    let doc = roomsRef.doc();

    setShowModal(false);
    doc
      .set({
        title: roomName,
      })

      .then((roomre) => {
        console.log(doc);
        roomsRef.doc(doc.id).collection("members").add({
          createdAt: new Date().getTime(),
          user: currentUser,
        });
      });

    setRoomName("");
  };

  const handleJoinRoom = () => {
    setRoomName("");
  };

  useEffect(() => {
    return roomsRef.onSnapshot((snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        console.log(doc.data().members, "doc in snapshot");
        // doc.data().
        // if(doc)
        roomsData.push({ ...doc.data(), id: doc.id });
      });

      setRooms(roomsData);
    });
  }, []);

  return (
    <Flex h="100vh" w="100vw" bg="gray.100" direction="column">
      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
        rooms={rooms}
        setSelectedRoom={setSelectedRoom}
      />
      <Header
        setShowJoinModal={setShowJoinModal}
        setDrawerOpen={setDrawerOpen}
      />

      <ChatDrawer
        isDrawerOpen={isChatDrawerOpen}
        setDrawerOpen={setChatDrawerOpen}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      {/* Drawer */}

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
                placeholder="Enter Room Name..."
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

        <Spacer />
        {selectedRoom && (
          <Flex height="40px" w="full" justify="flex-end" align="center">
            <Box>
              <IconButton
                colorScheme="facebook"
                onClick={() => setChatDrawerOpen(true)}
                _focus={{ outline: "none" }}
                size="lg"
                icon={<AiOutlineMessage size="24" />}
              />
            </Box>
          </Flex>
        )}
        <Box mt={4} />
      </Flex>
    </Flex>
  );
};

export default MeditationRooms;
