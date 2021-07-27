import React, { useState } from "react";

import { Flex, Box, Text, Grid, Button, Image } from "@chakra-ui/react";
import Header from "../components/Header";
import { GiTriquetra } from "react-icons/gi";
const meditationCoverImg = process.env.PUBLIC_URL + "/meditation_cover.png";

const Dashboard = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  return (
    <Flex flex bg="gray.100" w="full" h="full" direction="column">
      <Header hasBg={true} setShowJoinModal={setShowJoinModal} />

      <Box mt={20} />

      <Grid templateColumns="repeat(2, 1fr)">
        <Flex mx={24} direction="column">
          <Text
            fontSize="5xl"
            fontWeight="bold"
            color="brand.800"
            lineHeight="1.2"
          >
            Mindfulness for your everyday life.
          </Text>

          <Box mt={6} />

          <Text w="80%" fontSize="md" fontWeight="bold" color="blackAlpha.600">
            Less Stress. More happiness. Restful sleep. It all starts with just
            a few minutes of mediation everyday.
          </Text>

          <Box mt={6} />
          <Flex>
            <Button
              color="white"
              bg="brand.800"
              height="54px"
              borderRadius={24}
              px={8}
              _focus={{ outline: "none" }}
              _active={{ backgroundColor: "facebook.900" }}
              _hover={{ backgroundColor: "facebook.700" }}
            >
              Start your Meditation Journey Today
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Image
            src={meditationCoverImg}
            objectFit="contain"
            borderRadius={32}
          />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
