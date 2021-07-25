import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from "./containers/Login";
import { Flex } from "@chakra-ui/layout";

function App() {
  return (
    <Router>
        <Flex h="100vh" w="100vw">
        <Switch>
          <Route exact path ='/login' component={Login} />
        </Switch>
    </Flex>
      </Router>
  );
}

export default App;
