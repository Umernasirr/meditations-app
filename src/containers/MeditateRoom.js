import React, { useState, useEffect } from "react";

import { Flex, Box, Spacer, IconButton } from "@chakra-ui/react";
import Header from "../components/Header";
import { AiOutlineMessage } from "react-icons/ai";
import firebase from "../firebase";
import { useSelector } from "react-redux";
import MyDrawer from "../components/MyDrawer";
import ChatDrawer from "../components/ChatDrawer";
import CountdownTimer from "../components/CountdownTimer";
import CreateNewRoomModal from "../components/CreateNewRoomModal";
import JoinRoomModal from "../components/JoinRoomModal";

const backgroundImg = process.env.PUBLIC_URL + "/bg_img.jpg";

const MeditationRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [roomName, setRoomName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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
      snapshot &&
        snapshot.forEach((doc) => {
          // doc.data().
          // if(doc)
          roomsData.push({ ...doc.data(), id: doc.id });
        });

      setRooms(roomsData);
    });
  }, []);

  return (
    <Flex
      h="100vh"
      w="100vw"
      bg="gray.100"
      direction="column"
      bgImage={backgroundImg}
      bgSize="cover"
    >
      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
        rooms={rooms}
        setSelectedRoom={setSelectedRoom}
        setChatDrawerOpen={setChatDrawerOpen}
      />
      <Header
        setShowJoinModal={setShowJoinModal}
        setDrawerOpen={setDrawerOpen}
        setShowModal={setShowModal}
      />

      <ChatDrawer
        isDrawerOpen={isChatDrawerOpen}
        setDrawerOpen={setChatDrawerOpen}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      {/* Join Room Model */}
      <JoinRoomModal
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        roomName={roomName}
        setRoomName={setRoomName}
        handleJoinRoom={handleJoinRoom}
      />
      {/* Create New Room Modal */}
      <CreateNewRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        roomName={roomName}
        setRoomName={setRoomName}
        handleRoomCreate={handleRoomCreate}
      />
      <Flex mx={24} direction="column" h="full">
        <Flex h="full" w="full" align="center" justify="center">
          <CountdownTimer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </Flex>

        <Spacer />
        {selectedRoom && (
          <Flex height="40px" w="90vw" justify="flex-end" align="center">
            <Box>
              <IconButton
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.800" }}
                onClick={() => setChatDrawerOpen(true)}
                _focus={{ outline: "none" }}
                size="lg"
                icon={<AiOutlineMessage size="24" />}
              />
            </Box>
          </Flex>
        )}
        <Box mt={8} />
      </Flex>
    </Flex>
  );
};

export default MeditationRooms;
