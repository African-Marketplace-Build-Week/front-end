import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/styles.css";
import Signup from "./components/SingUp";
import "./styles/signUpStyle.css";

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      {/* <Route exact path="/" component={Home} /> */}
      <Route path="/signup" component={Signup} />
      {/* <Route path="/login" component={Login} /> */}
    </div>
  );
}

export default App;
