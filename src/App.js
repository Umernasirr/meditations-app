import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import firebase from "firebase";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";

function App() {
  return (
    <Router>
      <Flex h="100vh" w="100vw">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Flex>
    </Router>
  );
}

export default App;
