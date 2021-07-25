import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Footer from "./components/Footer";
import Rooms from "./containers/Rooms";

function App() {
  return (
    <Router>
      <Flex h="100vh" w="100vw" direction="column">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/rooms" component={Rooms} />
        </Switch>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
