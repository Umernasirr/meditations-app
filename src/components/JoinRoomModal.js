import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import React from "react";
import { AiOutlineMessage } from "react-icons/ai";

const JoinRoomModal = ({
  showJoinModal,
  setShowJoinModal,
  roomName,
  setRoomName,
  handleJoinRoom,
}) => {
  return (
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
              borderColor="brand.600"
              borderWidth={2}
              _focus={{ outline: "none" }}
              _hover={{ borderColor: "brand.800" }}
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
  );
};

export default JoinRoomModal;
