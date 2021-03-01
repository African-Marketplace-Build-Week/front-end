import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
