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

  const [meditationText, setMeditationText] = useState("Get Ready");

  const handleMeditationText = () => {
    const n = 2;
    setMeditationText("Breath In");

    let meditationId = setInterval(() => {
      if (n % 2 === 1) {
        setMeditationText("Breath In");
      } else {
        setMeditationText("Breath Out");
      }
    }, 5000);

    setTimeout(() => {
      clearInterval(meditationId);
      setMeditationText("Get Ready");
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

  const onStartTimer = () => {
    if (isAdmin) {
      timerRef.current.api.start();
    }
    setIsPlaying(true);
  };

  const onStartHandler = () => {
    if (isAdmin) {
      // handleMeditationText();

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

      setIsPlaying(false);
    }
  };

  const renderer = (props) => {
    if (props.completed) {
      return null;
    } else {
      return <Text>{props.seconds}</Text>;
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
        <Flex
          width="360px"
          height="360px"
          bg="blackAlpha.300"
          borderRadius="50%"
          borderColor="white"
          borderWidth={16}
          color="white"
          fontSize={60}
          align="center"
          justify="center"
          direction="column"
        >
          <Countdown
            key={key}
            date={Date.now() + duration * 1000}
            renderer={renderer}
            ref={timerRef}
            onStart={onStartHandler}
            onComplete={onCompleteHandler}
            autoStart={false}
          />
          <Text ml={1} fontSize={32}>
            {meditationText}
          </Text>
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
      <Box mt={12} />
    </Flex>
  );
};

export default CountdownTimer;
