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
import { IoMdReturnRight } from "react-icons/io";

const backgroundImg = process.env.PUBLIC_URL + "/bg_img.jpg";

const MeditationRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [roomName, setRoomName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [roomError, setRoomError] = useState("");
  const [rooms, setRooms] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomsRef, setroomsRef] = useState(
    firebase.firestore().collection("rooms")
  );
  // const roomsRef = firebase.firestore().collection("rooms");
  const handleRoomCreate = () => {
    let doc = roomsRef.doc();

    doc
      .set({
        title: roomName,
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
              createdAt: new Date().getTime(),
            };
            setShowModal(false);
            setSelectedRoom(newRoom);

            setChatDrawerOpen(true);
          });
      });
    roomsRef.onSnapshot((snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        let isMember = false;
        const members = roomsRef
          .doc(doc.id)
          .collection("members")
          .get()
          .then((ref) => {
            ref.forEach((reff) => {
              if (reff.data().user.uid === currentUser.uid) {
                isMember = true;
              }
            });
          })
          .then(() => {
            if (isMember) {
              roomsData.push({ ...doc.data(), id: doc.id });
              setRooms(roomsData);
            }
          });
      });
    });

    setRoomName("");
  };

  const handleJoinRoom = () => {
    let isMember = false;
    const data = roomsRef
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
                // roomsData.push({ ...doc.data(), id: doc.id });
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

                roomsRef.onSnapshot((snapshot) => {
                  const roomsData = [];
                  snapshot.forEach((doc) => {
                    let isMember = false;
                    const members = roomsRef
                      .doc(doc.id)
                      .collection("members")
                      .get()
                      .then((ref) => {
                        ref.forEach((reff) => {
                          if (reff.data().user.uid === currentUser.uid) {
                            isMember = true;
                          }
                        });
                      })
                      .then(() => {
                        if (isMember) {
                          setRooms(roomsData);
                          return roomsData.push({ ...doc.data(), id: doc.id });
                        }
                      });
                  });
                });
              }
            });
        }
      });
    setRoomName("");
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     const roomListener = roomsRef.onSnapshot((snapshot) => {
  //       const roomsData = [];
  //       snapshot.forEach((doc) => {
  //         let isMember = false;
  //         const members = roomsRef
  //           .doc(doc.id)
  //           .collection("members")
  //           .get()
  //           .then((ref) => {
  //             ref.forEach((reff) => {
  //               if (reff.data().user.uid === currentUser.uid) {
  //                 isMember = true;
  //               }
  //             });
  //           })
  //           .then(() => {
  //             if (isMember) {
  //               roomsData.push({ ...doc.data(), id: doc.id });
  //               setRooms(roomsData);
  //             }
  //           });
  //       });
  //     });
  //     return () => roomListener();
  //   }
  // }, [currentUser]);

  useEffect(() => {
    setRooms([]);
    const roomsData = [];

    if (!currentUser) {
      return;
    }
    const roomListener = roomsRef.onSnapshot((querySnapshot) => {
      const rooms = querySnapshot.docs.forEach((doc) => {
        roomsRef
          .doc(doc.id)
          .collection("members")
          .get()
          .then((ref) => {
            const memberInRoom = ref.docs.filter((member) => {
              return member.data().user.uid === currentUser?.uid;
            });

            if (memberInRoom) {
              roomsData.push({ ...doc.data(), id: doc.id });
            }

            console.log(roomsData);
            // setRooms(tempRooms);

            // ref.forEach((reff) => {
            //   if (reff.data().user.uid === currentUser.uid) {
            //     isMember = true;
            //   }
            // });
          });

        setRooms(roomsData);

        // .then(() => {
        //   if (isMember) {
        //     roomsData.push({ ...doc.data(), id: doc.id });
        //     setRooms(roomsData);
        //   }
        // });
      });
    });

    return () => roomListener();
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

      <MyDrawer
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
        rooms={rooms}
        setSelectedRoom={setSelectedRoom}
        setChatDrawerOpen={setChatDrawerOpen}
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
          <CountdownTimer
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            selectedRoom={selectedRoom}
          />
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
