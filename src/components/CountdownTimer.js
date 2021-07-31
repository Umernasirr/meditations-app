import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import Countdown from "react-countdown";
import firebase from "../firebase";

const CountdownTimer = ({
  isPlaying,
  setIsPlaying,
  selectedRoom,
  members,
  isAdmin,
}) => {
  const [duration, setDuration] = useState(0);
  const roomsRef = firebase.firestore().collection("rooms");
  const timerRef = useRef();

  useEffect(() => {
    if (!selectedRoom) {
      return;
    }

    let localDuration = -1;
    let isRead = false;

    const roomListener = roomsRef
      .doc(selectedRoom.id)
      .onSnapshot((querySnapshot) => {
        const tempRoom = querySnapshot.data();
        if (tempRoom) {
          if (tempRoom.status === false || tempRoom.startTimerStamp === -1) {
            localDuration = tempRoom.duration;
            isRead = false;
          } else {
            const difference = new Date().getTime() - tempRoom.startTimerStamp;
            localDuration = Math.ceil(difference / 1000);
          }
          if (querySnapshot.data().status === true) {
            timerRef.current.api.start();
          }
          if (!isRead) {
            isRead = true;
            setDuration(localDuration);
          }
        }
      });
    return () => roomListener();
  }, [selectedRoom]);

  const [key, setKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const onStartTimer = () => {
    if (isAdmin) {
      timerRef.current.api.start();
    }
    setIsPlaying(true);
  };

  const onStartHandler = () => {
    if (isAdmin) {
      roomsRef.doc(selectedRoom.id).update({
        startTimerStamp: new Date().getTime(),
        status: true,
      });
    }
  };

  const onCompleteHandler = () => {
    if (isAdmin) {
      setTimeout(() => {
        roomsRef.doc(selectedRoom.id).update({
          startTimerStamp: -1,
          status: false,
        });
      }, 1000);
    }
  };
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = (props) => {
    if (props.completed) {
      return <Completionist />;
    } else {
      return <span>{props.seconds}</span>;
    }
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
                        {names.map(
                          (name, index) =>
                            name && (
                              <Text fontWeight="bold">{`${name[0]}.`}</Text>
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
      {selectedRoom && (
        <Box width="500px" height="auto" bg="white">
          <Countdown
            key={key}
            date={Date.now() + duration * 1000}
            renderer={renderer}
            ref={timerRef}
            onStart={onStartHandler}
            onComplete={onCompleteHandler}
            autoStart={false}
          />
        </Box>
      )}
      <Box my={4} />
      {selectedRoom && isAdmin && (
        <Flex direction="row" align="center" justify="center">
          <Button
            width="200px"
            height="50px"
            borderRadius={16}
            bg="brand.600"
            color="gray.100"
            _hover={{ bg: "brand.800" }}
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
