import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Countdown from "react-countdown";
import firebase from "../firebase";

const CountdownTimer = ({ isPlaying, setIsPlaying, selectedRoom, members }) => {
  // const [members, setMembers] = useState([]);
  const [localSelectedRoom, setLocalSelectedRoom] = useState([]);
  const [duration, setDuration] = useState(20);
  const roomsRef = firebase.firestore().collection("rooms");

  useEffect(() => {
    if (!selectedRoom) {
      return;
    }
    // console.log(selectedRoom);
    let localDuration = -1;
    const roomListener = roomsRef
      .doc(selectedRoom.id)
      //  .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const tempRoom = querySnapshot.data();
        setLocalSelectedRoom(tempRoom);
        if (tempRoom) {
          console.log(tempRoom);
          console.log(tempRoom.startTimerStamp?.seconds);

          if (tempRoom.status === false || tempRoom.startTimerStamp === -1) {
            // setDuration(selectedRoom.duration);
            localDuration = selectedRoom.duration;
            console.log(localDuration, "localll");
          } else {
            const difference = Math.ceil(
              new Date().getTime() / 1000 - tempRoom.startTimerStamp?.seconds
            );
            // setDuration(difference);
            localDuration = difference;
            console.log(difference, "Difference");
          }
          if (querySnapshot.data().status === true) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
          console.log("is the code cominghere", localDuration);
          setDuration(localDuration);
        }
      });

    // }
    return () => roomListener();
  }, [selectedRoom]);

  const [key, setKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const onStartTimer = () => {
    roomsRef.doc(selectedRoom.id).update({
      startTimerStamp: new Date().getTime(),
      status: true,
    });

    setIsPlaying(true);
  };
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
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
        {members && members.length > 0
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
                            <Text fontWeight="bold">{`${name[0]}.`}</Text>
                          ) : (
                            <Text fontWeight="bold">{`${name[0]}`}</Text>
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
      {selectedRoom && selectedRoom.duration && duration !== -1 && (
        <Box width="500px" height="auto" bg="white">
          <Countdown date={duration} renderer={renderer} />
        </Box>
        // <CountdownCircleTimer
        //   key={key}
        //   size={400}
        //   isPlaying={isPlaying}
        //   strokeWidth={16}
        //   duration={duration}
        //   colors={[["#6269A0"], ["#ee4f4f"]]}
        //   onComplete={() => {
        //     setIsCompleted(true);
        //     roomsRef.doc(selectedRoom.id).update({
        //       startTimerStamp: -1,
        //       status: false,
        //     });
        //     return [false, 1000];
        //   }}
        // >
        //   {renderTime}
        // </CountdownCircleTimer>
      )}
      <Box my={4} />
      {selectedRoom && (
        <Flex direction="row" align="center" justify="center">
          <Button
            width="200px"
            height="50px"
            borderRadius={16}
            bg="brand.600"
            color="gray.100"
            _hover={{ bg: "brand.800" }}
            disabled={isPlaying}
            onClick={onStartTimer}
          >
            <Text fontSize={18} fontWeight="bold">
              Start Meditation
            </Text>
          </Button>
        </Flex>
      )}
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
