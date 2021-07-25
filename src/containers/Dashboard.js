import React from "react";

import { Flex, Box, Text, Grid, Button, Image } from "@chakra-ui/react";

import Header from "../components/Header";

const meditationCoverImg = process.env.PUBLIC_URL + "/meditation_cover.jpg";

const Dashboard = () => {
  return (
    <Flex flex bg="gray.100" w="full" h="full" direction="column">
      <Header />

      <Box mt={24} />

      <Grid templateColumns="repeat(2, 1fr)">
        <Flex mx={24} direction="column">
          <Text
            fontSize="6xl"
            fontWeight="bold"
            color="blackAlpha.800"
            lineHeight="1.2"
          >
            Mindfulness for your everyday life.
          </Text>

          <Box mt={8} />

          <Text w="80%" fontSize="md" fontWeight="bold" color="blackAlpha.600">
            Less Stress. More happiness. Restful sleep. It all starts with just
            a few minutes of mediation everyday.
          </Text>

          <Box mt={4} />
          <Flex>
            <Button
              color="white"
              bg="facebook.500"
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

        <Flex width="90%">
          <Image
            boxShadow="md"
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
