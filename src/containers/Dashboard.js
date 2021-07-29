import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Grid, Button, Image, Spacer } from "@chakra-ui/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import LiveRooms from "../components/LiveRooms";
import ChatListPopup from "../components/ChatListPopup";
import { useSelector } from "react-redux";
import firebase from "../firebase";

const meditationCoverImg = process.env.PUBLIC_URL + "/meditation_cover.png";

const Dashboard = () => {
  const history = useHistory();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const roomsRef = firebase.firestore().collection("rooms");

  useEffect(() => {
    const getRooms = async () => {
      setRooms([]);
      const firebaseData = await roomsRef.get();
      const tempRooms = firebaseData.docs.map((rooms) => rooms.data());
      setRooms(tempRooms);
    };

    getRooms();
  }, []);

  return (
    <Flex flex bg="gray.100" w="full" h="full" direction="column">
      <Header hasBg={true} setShowJoinModal={setShowJoinModal} />

      <Box mt={8} />

      <Grid templateColumns="repeat(2, 1fr)">
        <Flex h="80vh" mx={16} direction="column">
          <Text
            fontSize="5xl"
            fontWeight="bold"
            color="brand.800"
            lineHeight="1.2"
          >
            Mindfulness for your everyday life.
          </Text>

          <Box mt={4} />

          <Text w="80%" fontSize="md" fontWeight="bold" color="blackAlpha.600">
            Less Stress. More happiness. Restful sleep. It all starts with just
            a few minutes of mediation everyday.
          </Text>

          <Box mt={4} />
          {!isDrawerOpen && (
            <Flex>
              <Button
                color="white"
                bg="brand.800"
                height="48px"
                borderRadius={16}
                px={8}
                _focus={{ outline: "none" }}
                _active={{ backgroundColor: "facebook.900" }}
                _hover={{ backgroundColor: "facebook.700" }}
                onClick={() => history.push("/meditate")}
              >
                Start your Journey Today
              </Button>
            </Flex>
          )}
          <Box mt={4} />

          <Spacer />
          <Flex align="center" justify="flex-start">
            <ChatListPopup
              moduleHeight="320px"
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              setChatDrawerOpen={() => {}}
              currentUser={currentUser}
              rooms={rooms}
              setRooms={setRooms}
              paddingX={0}
              placement={"top-end"}
              hasBorder={true}
              showSearch={false}
              setSelectedRoom={() => {
                currentUser
                  ? history.push("/meditate")
                  : history.push("/login");
              }}
            />
            <Box mx={2} />
            <Button onClick={() => setDrawerOpen(!isDrawerOpen)}>
              Join Rooms Now
            </Button>
          </Flex>

          {/* <Flex width="60%" py={2} justify="flex-end">
            <Button
              color="brand.600"
              bg="transparent"
              _hover={{ color: "brand.800" }}
            >
              Find More Rooms
            </Button>
          </Flex> */}
        </Flex>

        <Flex>
          <Image
            src={meditationCoverImg}
            objectFit="contain"
            borderRadius={32}
          />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
