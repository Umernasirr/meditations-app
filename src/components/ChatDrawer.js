import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";

import React from "react";
import MeditationChat from "./MeditationChat";

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
          <DrawerCloseButton size="lg" color="white" />

          <DrawerHeader
            bg="brand.600"
            borderColor="gray.300"
            color="white"
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
                backgroundColor: "#6269A0",
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
