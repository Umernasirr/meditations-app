import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { AiOutlineFieldTime } from "react-icons/ai";

const CountdownTimer = ({ isPlaying, setIsPlaying }) => {
  const [duration, setDuration] = useState(1);
  const [key, setKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  console.log(duration);
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <Flex direction="column" justify="center" align="center">
          <Text fontSize={40} fontWeight="medium" color="brand.400">
            Meditation
          </Text>
          <Box mt={2} />
          <Text fontSize={32} color="brand.200">
            Completed
          </Text>
        </Flex>
      );
    }

    return (
      <Flex direction="column" justify="center" align="center">
        <Text fontSize={24} color="gray.100">
          Remaining
        </Text>
        <Text fontSize={64} fontWeight="bold">
          {remainingTime}
        </Text>
        <Text fontSize={24} color="gray.100">
          seconds
        </Text>
      </Flex>
    );
  };

  return (
    <Flex direction="column" align="center">
      <CountdownCircleTimer
        key={key}
        size={400}
        isPlaying={isPlaying}
        strokeWidth={16}
        duration={duration ? duration : 0}
        colors={[["#6269A0"], ["#ee4f4f"]]}
        onComplete={() => {
          setIsCompleted(true);
          return [false, 1000];
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
      <Box my={4} />
      <Flex direction="row" align="center" justify="center">
        <Flex justify="center" align="flex-end">
          <AiOutlineFieldTime size={40} color="white" />
          <Box mr={2} />
          <NumberInput
            step={5}
            defaultValue={duration}
            onChange={(val) => {
              setDuration(val);
            }}
            min={5}
            max={10000}
          >
            <NumberInputField borderRadius={8} bg="white" value={duration} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box mr={4} />
        </Flex>
        <Button
          width="200px"
          height="50px"
          borderRadius={16}
          bg="brand.600"
          color="gray.100"
          _hover={{ bg: "brand.800" }}
          disabled={isPlaying}
          onClick={() => setIsPlaying(true)}
        >
          <Text fontSize={18} fontWeight="bold">
            Start Meditation
          </Text>
        </Button>
      </Flex>
      <Box mt={2} />
      {isCompleted ? (
        <Button
          height="60px"
          bg="transparent"
          borderRadius={32}
          variant="link"
          color="gray.100"
          _hover={{ color: "brand.100" }}
          _focus={{ outline: "none" }}
          disabled={!isCompleted}
          onClick={() => {
            setKey(key + 1);
            setIsPlaying(false);
            setIsCompleted(false);
          }}
        >
          <Text fontSize={20} fontWeight="bold">
            Reset Timer
          </Text>
        </Button>
      ) : (
        <Box height="60px" />
      )}
    </Flex>
  );
};

export default CountdownTimer;
