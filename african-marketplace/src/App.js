import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/styles.css";
import Signup from "./components/SingUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route path="/signup" component={Signup} /> */}
        {/* <Route path="/login" component={Login} /> */}
      </Router>
    </div>
  );
}

export default App;
