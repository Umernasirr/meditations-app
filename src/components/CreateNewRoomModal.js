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

const CreateNewRoomModal = ({
  showModal,
  setShowModal,
  roomName,
  setRoomName,
  handleRoomCreate,
}) => {
  return (
    <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalContent>
        <ModalHeader>New Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineMessage />
            </InputLeftElement>
            <Input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter Room Name..."
              borderColor="brand.600"
              borderWidth={2}
              _focus={{ outline: "none" }}
              _hover={{ borderColor: "brand.800" }}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            bg="brand.600"
            color="gray.100"
            _hover={{ backgroundColor: "brand.800" }}
            onClick={() => handleRoomCreate()}
          >
            Create New Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewRoomModal;