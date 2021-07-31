import React, { useState, useEffect } from "react";

import { Flex, Box, Spacer } from "@chakra-ui/react";
import Header from "../components/Header";
import firebase from "../firebase";
import { useSelector } from "react-redux";
import ChatListPopup from "../components/ChatListPopup";
import CountdownTimer from "../components/CountdownTimer";
import CreateNewRoomModal from "../components/CreateNewRoomModal";
import JoinRoomModal from "../components/JoinRoomModal";
import ChatMessagesPopup from "../components/ChatMessagesPopup";
import LeaveGroupModal from "../components/LeaveGroupModal";

const backgroundImg = process.env.PUBLIC_URL + "/bg_img.jpg";

const MeditationRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [roomName, setRoomName] = useState("");
  const [duration, setDuration] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [roomError, setRoomError] = useState("");
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingJoinRoom, setLoadingJoinRoom] = useState(false);
  const [loadingCreateRoom, setLoadingCreateRoom] = useState(false);
  const [loadingLeaveRoom, setLoadingLeaveRoom] = useState(false);
  const roomsRef = firebase.firestore().collection("rooms");

  const handleLeaveRoom = () => {
    setLoadingLeaveRoom(true);
    let isAdmin = currentUser.uid === selectedRoom.user.uid;
    roomsRef
      .doc(selectedRoom.id)
      .collection("members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (currentUser.uid === doc.data().user.uid) {
            roomsRef
              .doc(selectedRoom.id)
              .delete()
              .then(() => {
                setSelectedRoom(undefined);
                setShowLeaveGroupModal(false);
              });
            if (isAdmin) {
            } else {
              doc.ref.delete().then(() => {
                setSelectedRoom(undefined);
                setShowLeaveGroupModal(false);
                setLoadingLeaveRoom(false);
              });
            }
          }
        });
      });

    const tempRooms = rooms.filter((room) => room.id !== selectedRoom.id);
    setRooms(tempRooms);
  };

  useEffect(() => {
    setMembers([]);

    if (!selectedRoom) {
      return;
    }
    if (!currentUser) {
      return;
    }

    setIsAdmin(currentUser.uid === selectedRoom.user.uid);

    const memberListener = roomsRef
      .doc(selectedRoom.id)
      .collection("members")
      //  .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const members = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            id: doc.id,
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });
        setMembers(members);
      });

    return () => memberListener();
  }, [selectedRoom, currentUser]);

  //
  const handleRoomCreate = (isChecked) => {
    // isChecked
    setLoadingCreateRoom(true);
    let doc = roomsRef.doc();
    doc
      .set({
        title: roomName,
        duration: duration,
        status: false,
        isGlobal: isChecked,
      })
      .then(() => {
        roomsRef
          .doc(doc.id)
          .collection("members")
          .add({
            createdAt: new Date().getTime(),
            user: currentUser,
          })
          .then(() => {
            const newRoom = {
              title: roomName,
              id: doc.id,
              user: currentUser,
              status: false,
              duration: duration,
              isGlobal: isChecked,
              createdAt: new Date().getTime(),
            };
            setSelectedRoom(newRoom);

            setRooms([...rooms, newRoom]);
            setChatDrawerOpen(true);
            setShowModal(false);
            setLoadingCreateRoom(false);
          });
      });
  };

  //
  const handleJoinRoom = () => {
    let isMember = false;
    setLoadingJoinRoom(true);
    roomsRef
      .doc(roomName)
      .get()
      .then((doc) => {
        if (!doc.data() || doc.data() === undefined) {
          setRoomError("No room found");
        } else {
          roomsRef
            .doc(roomName)
            .collection("members")
            .get()
            .then((col) => {
              col.forEach((doc) => {
                if (doc.data().user.uid === currentUser.uid) {
                  isMember = true;
                }
              });
            })
            .then(() => {
              if (isMember) {
                setRoomError("Already a part of this room");
              } else {
                roomsRef.doc(roomName).collection("members").add({
                  createdAt: new Date().getTime(),
                  user: currentUser,
                });

                const newRoom = {
                  title: doc.data().title,
                  id: doc.id,
                  user: currentUser,
                  status: false,
                  duration: duration,
                  createdAt: new Date().getTime(),
                };
                setSelectedRoom(newRoom);
                setRooms([...rooms, newRoom]);
                setChatDrawerOpen(true);
                setShowJoinModal(false);
                setLoadingJoinRoom(false);
              }
            });
        }
      });
    setRoomName("");
  };

  useEffect(() => {
    const getRooms = async () => {
      setRooms([]);
      const tempRooms = [];
      const firebaseData = await roomsRef.get();

      firebaseData.docs.map(async (room) => {
        const memberCollection = await roomsRef
          .doc(room.id)
          .collection("members")
          .get();

        const myRooms = memberCollection.docs.filter(
          (memberData) => memberData.data().user.uid === currentUser.uid
        );

        if (myRooms.length > 0) {
          const roomData = {
            id: room.id,
            ...room.data(),
            ...myRooms[0]?.data(),
          };

          tempRooms.push(roomData);
        }
        //
      });

      setRooms(tempRooms);
    };

    if (currentUser) {
      getRooms();
    }
  }, [currentUser]);

  return (
    <Flex
      h="100vh"
      w="100vw"
      bg="gray.100"
      direction="column"
      bgImage={backgroundImg}
      bgSize="cover"
    >
      <Header
        setShowJoinModal={setShowJoinModal}
        setDrawerOpen={setDrawerOpen}
        setShowModal={setShowModal}
      />

      {/* Join Room Model */}
      <JoinRoomModal
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        roomName={roomName}
        setRoomName={setRoomName}
        handleJoinRoom={handleJoinRoom}
        loadingJoinRoom={loadingJoinRoom}
      />

      <LeaveGroupModal
        showLeaveGroupModal={showLeaveGroupModal}
        setShowLeaveGroupModal={setShowLeaveGroupModal}
        handleLeaveRoom={handleLeaveRoom}
        isAdmin={isAdmin}
        loadingLeaveRoom={loadingLeaveRoom}
      />
      {/* Create New Room Modal */}
      <CreateNewRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        roomName={roomName}
        setRoomName={setRoomName}
        handleRoomCreate={handleRoomCreate}
        duration={duration}
        setDuration={setDuration}
        loadingCreateRoom={loadingCreateRoom}
      />
      <Flex mx={8} direction="column" h="full">
        <Flex h="full" w="full" align="center" justify="center">
          <CountdownTimer
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            selectedRoom={selectedRoom}
            members={members}
          />
        </Flex>
        <Spacer />

        <Flex
          height="40px"
          w="full"
          justify="space-between"
          align="center"
          px={20}
        >
          <Box>
            <ChatListPopup
              moduleHeight="480px"
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              setSelectedRoom={setSelectedRoom}
              setChatDrawerOpen={setChatDrawerOpen}
              currentUser={currentUser}
              rooms={rooms}
              setRooms={setRooms}
              placement={"top"}
              paddingX={8}
              hasBorder={false}
              showSearch={true}
            />
          </Box>

          {selectedRoom && (
            <Box>
              <ChatMessagesPopup
                isDrawerOpen={isChatDrawerOpen}
                setDrawerOpen={setChatDrawerOpen}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                showLeaveGroupModal={showLeaveGroupModal}
                setShowLeaveGroupModal={setShowLeaveGroupModal}
              />
            </Box>
          )}
        </Flex>
        <Box mt={8} />
      </Flex>
    </Flex>
  );
};

export default MeditationRooms;
