import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import styled from 'styled-components';
import image from '../styles/images/pexels-markus-spiske-4040333.jpg';



export default function Home(props) {
  // styles
  const HomePage = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    display: flex;
  `;

  const ImageBox = styled.div`
    background-image: url(${image});
    background-size: 100% 100vh;
    background-repeat: no-repeat;
    width: 40%;
    height: 100vh;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: rosybrown;
    height: 100%;
    width: 100%;
    color: white;
  `;

  const Nav = styled.nav`
    display:flex;
    justify-content: center;
    border: 1px black;
    text-decoration: none;
    width: 30%;
    a {
      border: 0 solid;
      text-decoration: none;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
      outline: 1px solid;
      padding: 10px 30px;
      background-color: rgb(182, 81, 81);
      color: white;
      outline-color: rgba(255, 255, 255, .5);
      outline-offset: 0px;
      text-shadow: none;
      transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
      &:hover {
        border: 1px solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
        outline-color: rgba(255, 255, 255, 0);
        outline-offset: 15px;
        text-shadow: 1px 1px 2px #427388;
      }
    }
  `;

  const Title = styled.h1`
    font-size: 3rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(182, 81, 81);
    text-shadow: 4px 4px 0px white;
  `;
//end of styles

  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const LoginFunction = (details) => {
    setUser({
      email: details.email,
      password: details.password,
    });
  };
  return (
    <HomePage className="Home">
      <ImageBox className="background"></ImageBox>
      <Container className="content">
        <Title>African Marketplace</Title>
        <Nav>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </Nav>
        <Login Login={LoginFunction} error={error} />
      </Container>
    </HomePage>
  );
}
