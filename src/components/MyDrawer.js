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
} from "@chakra-ui/react";

import React from "react";
const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const MyDrawer = ({ isDrawerOpen, setDrawerOpen, rooms, setSelectedRoom }) => {
  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="left"
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Join a Room</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Search Room..." />

          <Box my={4} />

          {rooms &&
            rooms.length > 0 &&
            rooms.map((chat) => (
              <Flex
                _hover={{
                  backgroundColor: "whiteAlpha.700",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedRoom(chat);
                  setDrawerOpen(false);
                }}
                p={3}
                my={0}
                align="center"
                bg="white"
                borderColor="gray.100"
                borderWidth={1}
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
                    {chat.message
                      ? chat.messages[chat.messages.length - 1].message.slice(
                          0,
                          40
                        )
                      : "New Chat"}
                  </Text>
                </Box>
              </Flex>
            ))}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setDrawerOpen(false)}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
