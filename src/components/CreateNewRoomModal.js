import React, { useState } from "react";
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
  Spinner,
  Switch,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { AiOutlineMessage } from "react-icons/ai";

const CreateNewRoomModal = ({
  showModal,
  setShowModal,
  roomName,
  setRoomName,
  handleRoomCreate,
  duration,
  setDuration,
  loadingCreateRoom,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalContent>
        <ModalHeader>Create a New Room</ModalHeader>
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
          <InputGroup mt={3}>
            <Flex align="center" w="full">
              <Text fontWeight="bold" pr={2}>
                Duration(sec)
              </Text>
              <NumberInput
                borderWidth={1}
                borderColor="gray.400"
                borderRadius="8"
                value={duration}
                onChange={(text) => setDuration(text)}
                defaultValue={10}
                w="100%"
                min={0}
                max={200}
                step={5}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </InputGroup>
          <Flex mt={3} align="center" justify="flex-end">
            <Text px={2} fontWeight="medium">
              Make Room Global?
            </Text>
            <Switch
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              color="brand.600"
              size="lg"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          {loadingCreateRoom && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
          )}

          <Button colorScheme="red" mx={3} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            bg="brand.600"
            color="gray.100"
            _hover={{ backgroundColor: "brand.800" }}
            onClick={() => handleRoomCreate(isChecked)}
          >
            Create New Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewRoomModal;
