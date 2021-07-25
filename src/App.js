import React from "react";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";

import { Flex } from "@chakra-ui/layout";

function App() {
  return (
    <Flex h="100vh" w="100vw">
      <Dashboard />
    </Flex>
  );
}

export default App;
