import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

const App = () => {
  const [select, setSelect] = useState("admin");
  const [membership, setMembership] = useState(false);

  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home select={select} setSelect={setSelect} />
          </Route>
          <Route exact path="/login">
            <Login select={select} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
