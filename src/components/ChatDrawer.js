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
  Text,
} from "@chakra-ui/react";

import React from "react";
import MeditationChat from "./MeditationChat";
const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const ChatDrawer = ({
  isDrawerOpen,
  setDrawerOpen,
  selectedRoom,
  setSelectedRoom,
}) => {
  return (
    <Drawer
      size="sm"
      isOpen={isDrawerOpen}
      placement="right"
      onClose={() => setDrawerOpen(false)}
    >
      {/* <DrawerOverlay /> */}
      {selectedRoom ? (
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader
            bg="gray.100"
            borderColor="gray.300"
            borderBottomWidth={2}
          >
            <Text fontSize="md">
              {selectedRoom.title} - {selectedRoom.id}
            </Text>
          </DrawerHeader>

          <DrawerBody
            bg="gray.100"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#4267B2",
                borderRadius: "16px",
              },
            }}
          >
            {selectedRoom && (
              <MeditationChat
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      ) : (
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>No Room Selected</DrawerBody>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default ChatDrawer;
