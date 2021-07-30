import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import React from "react";

const LeaveGroupModal = ({
  handleLeaveRoom,
  showLeaveGroupModal,
  setShowLeaveGroupModal,
  isAdmin,
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
          <Text>
            {isAdmin
              ? "Exiting this room will delete the room since you are the admin. Are you sure you want to proceed?"
              : "Are you sure you want to exit this room?"}
          </Text>
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
            {isAdmin ? "Exit & Delete Room" : "Exit Room"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeaveGroupModal;
