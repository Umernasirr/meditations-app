import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Text,
  Flex,
} from "@chakra-ui/react";
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

const LeaveGroupModal = ({
  handleLeaveRoom,
  showLeaveGroupModal,
  setShowLeaveGroupModal,
}) => {
  return (
    <Modal
      size="xl"
      isOpen={showLeaveGroupModal}
      onClose={() => setShowLeaveGroupModal(false)}
    >
      <ModalContent>
        <ModalHeader>Exit Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to exit this room?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => setShowLeaveGroupModal(false)}
          >
            Cancel
          </Button>
          {/* <Button
            bg="brand.600"
            color="gray.100"
            _hover={{ backgroundColor: "brand.800" }}
            onClick={() => handlLea(false)}
          >
            Cancel
          </Button> */}
          <Button
            bg="brand.600"
            color="gray.100"
            _hover={{ backgroundColor: "brand.800" }}
            onClick={() => handleLeaveRoom()}
          >
            Exit Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeaveGroupModal;
