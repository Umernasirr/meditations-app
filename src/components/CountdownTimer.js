import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimer = () => {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <Text fontSize={28} color="gray.100">
          Meditation Completed...
        </Text>
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
    <CountdownCircleTimer
      size={400}
      isPlaying
      duration={10}
      colors={[
        ["#168eea", 0.5],
        ["#ee4f4f", 0.5],
      ]}
      onComplete={() => [true, 1000]}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;
