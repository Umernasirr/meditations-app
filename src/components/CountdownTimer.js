import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

const CountdownTimer = ({
  isPlaying,
  setIsPlaying,
  selectedRoom,
  members,
  isAdmin,
}) => {
  const [duration, setDuration] = useState(0);
  const roomsRef = firebase.firestore().collection("rooms");

  const [negative, setNegative] = useState(0);
  const progressCircularHandler = () => {
    // INTERVAL

    setNegative(0);

    const intervalId = setInterval(() => {
      setNegative((prevState) => prevState - 1);
      // console.log("HEY");
      // console.log(timerDuration);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, duration * 1000);
  };

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
            // timerRef.current.api.start();
            progressCircularHandler();
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

  const onStartTimer = () => {
    if (isAdmin) {
      setIsPlaying(true);
      onStartHandler();
    }
  };

  const onStartHandler = () => {
    if (isAdmin) {
      progressCircularHandler();
      roomsRef.doc(selectedRoom.id).update({
        startTimerStamp: new Date().getTime(),
        status: true,
      });
    }
  };

  const onCompleteHandler = () => {
    if (isAdmin) {
      setIsPlaying(false);
      setTimeout(() => {
        roomsRef.doc(selectedRoom.id).update({
          startTimerStamp: -1,
          status: false,
        });
      }, 1000);
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
        <Flex color="white">
          <ProgressProvider
            valueStart={duration}
            valueEnd={0}
            negative={negative}
            onCompleteHandler={onCompleteHandler}
            duration={duration}
          >
            {(value) => (
              <Box w="400px">
                <CircularProgressbar
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "#7586DB",
                    trailColor: "#FFDCE2",
                    textSize: value !== 0 ? "18px" : "14px",
                  })}
                  maxValue={duration}
                  value={value}
                  text={value !== 0 ? value : "Ready"}
                />
                {/* 
                <Countdown
                  key={key}
                  date={Date.now() + duration * 1000}
                  renderer={renderer}
                  ref={timerRef}
                  autoStart={false}
                /> */}
              </Box>
            )}
          </ProgressProvider>

          {/* <CircularProgressbarWithChildren
            maxValue={timerDuration}
            value={timerDuration}
          >
          
          </CircularProgressbarWithChildren> */}
        </Flex>
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
            disabled={isPlaying}
            _hover={{ bg: "brand.800" }}
            onClick={onStartTimer}
          >
            <Text fontSize={18} fontWeight="bold">
              Start Meditation
            </Text>
          </Button>
        </Flex>
      )}
      <Box my={8} />
    </Flex>
  );
};

export default CountdownTimer;
