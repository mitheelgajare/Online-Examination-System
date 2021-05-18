import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import HomePage from "./HomePage";
import AddQuestion from "./AddQuestion";

const App = () => {
  if (
    sessionStorage.getItem("OES-select") === "null" ||
    sessionStorage.getItem("OES-select") === null
  ) {
    sessionStorage.setItem("OES-select", "admin");
    sessionStorage.setItem("OES-membership", "false");
  }
  const [select, setSelect] = useState(sessionStorage.getItem("OES-select"));
  const [membership, setMembership] = useState(
    sessionStorage.getItem("OES-membership")
  );

  useEffect(() => {
    sessionStorage.setItem("OES-select", select);
    sessionStorage.setItem("OES-membership", membership);
  });

  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              select={select}
              setSelect={setSelect}
              membership={membership}
            />
          </Route>
          <Route exact path="/login">
            <Login select={select} setMembership={setMembership} />
          </Route>
          <Route exact path="/home">
            <HomePage membership={membership} select={select} />
          </Route>
          <Route exact path="/addQuestion">
            <AddQuestion />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
