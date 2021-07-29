import { Box, Button, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import firebase from "../firebase";

const CountdownTimer = ({ isPlaying, setIsPlaying, selectedRoom }) => {
  const [members, setMembers] = useState([]);
  const roomsRef = firebase.firestore().collection("rooms");
  useEffect(() => {
    setMembers([]);

    if (!selectedRoom) {
      return;
    }
    console.log(selectedRoom);

    const memberListener = roomsRef
      .doc(selectedRoom.id)
      .collection("members")
      //  .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const members = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            id: doc.id,
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });
        setMembers(members);
      });

    return () => memberListener();
  }, [selectedRoom]);

  const [key, setKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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
      <Flex w="full" h="40px" borderRadius={16} align="center" justify="center">
        {members.length > 0
          ? members.map((member) => {
              const user = member.user;
              let names;
              if (user.displayName) {
                names = user.displayName.toUpperCase().split(" ");
              } else {
                names = ["Unknown"];
              }

              return (
                <Flex direction="column" align="center" justify="center">
                  <Tooltip
                    placement="top"
                    fontSize="sm"
                    label={user.displayName ? user.displayName : "Unknown"}
                  >
                    <Box
                      mx={1}
                      borderRadius="50%"
                      minW="60px"
                      bg="brand.100"
                      p={4}
                      boxShadow="md"
                      _hover={{
                        bg: "brand.200",
                        cursor: "pointer",
                        color: "gray.700",
                      }}
                    >
                      <Flex justify="center" align="center">
                        {names.map((name, index) =>
                          index === names.length - 1 ? (
                            <Text>{`${name[0]}.`}</Text>
                          ) : (
                            <Text>{`${name[0]}`}</Text>
                          )
                        )}
                      </Flex>
                    </Box>
                  </Tooltip>
                </Flex>
              );
            })
          : null}
      </Flex>
      <Box my={4} />
      <CountdownCircleTimer
        key={key}
        size={400}
        isPlaying={isPlaying}
        strokeWidth={16}
        duration={selectedRoom?.duration ? selectedRoom.duration : 60}
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
          height="40px"
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
        <Box height="40px" />
      )}
    </Flex>
  );
};

export default CountdownTimer;
