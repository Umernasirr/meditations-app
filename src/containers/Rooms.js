import React, { useState } from "react";

import { Flex, Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";

const Rooms = () => {
  const [selectedChat, setSelectedChat] = useState(undefined);

  return (
    <Flex h="100vh" w="100vw" bg="gray.100" direction="column">
      <Header />

      <Box mt={8} />

      <Flex mx={24} direction="column" h="full">
        <Text fontSize="2xl" fontWeight="medium">
          Chats
        </Text>
        <Box mt={4} />

        <Grid w="full" h="full" templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={1} h="95%" bg="gray.100" boxShadow="base">
            <ChatList setSelectedChat={setSelectedChat} />
          </GridItem>
          <GridItem colSpan={3} h="95%" boxShadow="base">
            {selectedChat && (
              <ChatContainer
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Rooms;
