import React from "react";
import Login from "./containers/Login";
import { Flex } from "@chakra-ui/layout";

function App() {
  return (
    <Flex h="100vh" w="100vw">
      <Login />
    </Flex>
  );
}

export default App;
