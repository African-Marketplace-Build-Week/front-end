import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard"
// import PrivateRoute from "./components/PrivateRoute";
import "./styles/styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        {/* <PrivateRoute path="/:id/dashboard">
          <Dashboard setIsLoggedIn={setIsLoggedIn} />
        </PrivateRoute> */}
        <Route path="/dashboard">
          <Dashboard  />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
