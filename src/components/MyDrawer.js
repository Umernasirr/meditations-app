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

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const MyDrawer = ({
  isDrawerOpen,
  setDrawerOpen,
  rooms,
  setSelectedRoom,
  setChatDrawerOpen,
}) => {
  const [filteredRooms, setFilteredRooms] = useState(rooms ? rooms : []);

  const handleChangeSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      setSearchTxt(query);
      setFilteredRooms(rooms);
    } else {
      if (rooms && rooms.length > 0) {
        setSearchTxt(query);

        const tempRooms = rooms.filter((room) =>
          room.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredRooms(tempRooms);
      }
    }
  };

  useEffect(() => {
    if (rooms && filteredRooms && filteredRooms.length !== rooms.length) {
      setFilteredRooms(rooms);
    }
  }, [rooms]);

  console.log(rooms);
  const [searchTxt, setSearchTxt] = useState("");
  return (
    <Drawer
      bg="red"
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

          {rooms &&
            rooms.length > 0 &&
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

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setDrawerOpen(false)}>
            Cancel
          </Button>
          <Button
            bg="brand.600"
            color="gray.100"
            _hover={{ backgroundColor: "brand.800" }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
