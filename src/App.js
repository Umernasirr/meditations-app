import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import firebase from "firebase";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Footer from "./components/Footer";
import { setUser, clearUser } from "./redux/user";
import MeditateRoom from "./containers/MeditateRoom";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (
          history.location.pathname === "/signup" ||
          history.location.pathname === "/login" ||
          history.location.pathname === "/meditate" ||
          history.location.pathname === "/"
        ) {
          dispatch(setUser(user));
          history.push("/meditate");
        } else {
          dispatch(setUser(user));
          history.push(history.location.pathname);
        }
      } else {
        dispatch(clearUser());
        history.push("/");
      }
    });
  }, []);
  return (
    <Flex h="100vh" w="100vw" direction="column">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/rooms" component={MeditateRoom} />
        <Route exact path="/meditate" component={MeditateRoom} />

        <Footer />
      </Switch>
    </Flex>
  );
}

export default App;
