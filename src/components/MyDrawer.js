import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Text,
  Image,
  filter,
} from "@chakra-ui/react";
import firebase from "../firebase";

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const MyDrawer = ({
  isDrawerOpen,
  setDrawerOpen,
  setSelectedRoom,
  setChatDrawerOpen,
  currentUser,
  rooms,
  setRooms,
}) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTxt, setSearchTxt] = useState(" ");
  const roomsRef = firebase.firestore().collection("rooms");
  const roomsData = [];
  const [key, setKey] = useState(0);

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    setSearchTxt(query);

    if (query === "") {
      setFilteredRooms(rooms);
    } else {
      if (rooms && rooms.length > 0) {
        const tempRooms = rooms.filter((room) =>
          room.title.toLowerCase().includes(query.toLowerCase())
        );

        // setFilteredRooms(tempRooms);
      }
    }
  };

  useEffect(() => {
    setFilteredRooms(rooms);

    setTimeout(() => {
      setSearchTxt("");
      console.log("HEy");
    }, 5000);
  }, [currentUser, rooms]);

  return (
    <Drawer
      bg="red"
      key={key}
      isOpen={isDrawerOpen}
      placement="left"
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" size="lg" />
        <DrawerHeader bg="brand.600">
          <Text color="white">Join a Room</Text>
        </DrawerHeader>

        <Box my={2} />

        <DrawerBody
          bg="gray.50"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#6269A0",
              borderRadius: "16px",
            },
          }}
        >
          <Input
            placeholder="Search Room..."
            value={searchTxt}
            onChange={handleChangeSearch}
            bg="white"
            borderRadius={16}
            borderWidth={3}
            borderColor="brand.600"
            _hover={{ borderColor: "brand.800" }}
            _focus={{ outline: "none" }}
          />

          <Box my={4} />

          {filteredRooms &&
            filteredRooms.map((chat, index) => (
              <Flex
                key={index.toString()}
                _hover={{
                  backgroundColor: "whiteAlpha.700",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedRoom(chat);
                  setDrawerOpen(false);
                  setChatDrawerOpen(true);
                }}
                p={3}
                my={2}
                align="center"
                bg="white"
                borderColor="brand.400"
                borderWidth={2}
                borderRadius={16}
              >
                <Box
                  borderRadius={"50%"}
                  borderColor="facebook.500"
                  borderWidth={2}
                  p={1}
                >
                  <Image
                    src={groupImg}
                    width="40px"
                    height="40px"
                    borderRadius={"40%"}
                  />
                </Box>

                <Box ml={3}>
                  <Text fontWeight="bold">{chat.title}</Text>
                  <Text fontSize="0.8em" color="gray.500">
                    Enter Room
                  </Text>
                </Box>
              </Flex>
            ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
