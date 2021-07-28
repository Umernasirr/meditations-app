import React, { useState } from "react";

import {
  Flex,
  Box,
  Text,
  Grid,
  Button,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { GiTriquetra } from "react-icons/gi";
import { useHistory } from "react-router";
import LiveRooms from "../components/LiveRooms";
const meditationCoverImg = process.env.PUBLIC_URL + "/meditation_cover.png";

const Dashboard = () => {
  const history = useHistory();
  const [showJoinModal, setShowJoinModal] = useState(false);
  return (
    <Flex flex bg="gray.100" w="full" h="full" direction="column">
      <Header hasBg={true} setShowJoinModal={setShowJoinModal} />

      <Box mt={8} />

      <Grid templateColumns="repeat(2, 1fr)">
        <Flex mx={16} direction="column">
          <Text
            fontSize="5xl"
            fontWeight="bold"
            color="brand.800"
            lineHeight="1.2"
          >
            Mindfulness for your everyday life.
          </Text>

          <Box mt={4} />

          <Text w="80%" fontSize="md" fontWeight="bold" color="blackAlpha.600">
            Less Stress. More happiness. Restful sleep. It all starts with just
            a few minutes of mediation everyday.
          </Text>

          <Box mt={4} />
          <Flex>
            <Button
              color="white"
              bg="brand.800"
              height="48px"
              borderRadius={16}
              px={8}
              _focus={{ outline: "none" }}
              _active={{ backgroundColor: "facebook.900" }}
              _hover={{ backgroundColor: "facebook.700" }}
              onClick={() => history.push("/meditate")}
            >
              Start your Journey Today
            </Button>
          </Flex>
          <Box mt={4} />
          <LiveRooms />
          <Flex width="60%" py={2} justify="flex-end">
            <Button
              color="brand.600"
              bg="transparent"
              _hover={{ color: "brand.800" }}
            >
              Find More Rooms
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Image src={meditationCoverImg} C="contain" borderRadius={32} />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
