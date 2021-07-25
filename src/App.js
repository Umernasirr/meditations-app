import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Footer from "./components/Footer";
import Rooms from "./containers/Rooms";
import { setUser, clearUser } from "./redux/user";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (
          history.location.pathname === "/signup" ||
          history.location.pathname === "/login"
        ) {
          dispatch(setUser(user));
          // history.push("/rooms");
        } else {
          dispatch(setUser(user));
          history.push(history.location.pathname);
        }
      } else {
        dispatch(clearUser());
        history.push("/login");
      }
    });
  }, []);
  return (
    <Flex h="100vh" w="100vw" direction="column">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/rooms" component={Rooms} />
        <Footer />
      </Switch>
    </Flex>
  );
}

export default App;
