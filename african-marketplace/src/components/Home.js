import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from "./SingUp";
import Login from "./Login";
import "../styles/styles.css";
import "./styles/signUpStyle.css";

export default function Home(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const LoginFunction = (details) => {
    setUser({
      email: details.email,
      password: details.password,
    });
  };
  return (
    <div className="Home">
      <div className="background"></div>
      <div className="content">
        <h1>African Marketplace</h1>
        <nav>
          <Router className="links">
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
            <Route path="/signup" component={Signup} />
          </Router>
        </nav>
        <Login Login={LoginFunction} error={error} />
      </div>
    </div>
  );
}
