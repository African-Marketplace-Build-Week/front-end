import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import styled, { keyframes } from 'styled-components';
import image from '../styles/images/pexels-markus-spiske-4040333.jpg';



export default function Home(props) {
  // styles
  const slideLeft = keyframes`
    from { transform: translateX(100%);  }
    to { transform: translateX(0%); }
  `;
  const slideDown = keyframes`
    from { transform: translateY(-100%);  }
    to { transform: translateY(0%); }
  `;
  const fadeIn = keyframes`
    0% {opacity: 0}
    50% {opacity: 0}
    100% {opacity: 1}
  `;

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
    animation-name: ${slideDown};
    animation-duration: 1s;
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
    animation-name: ${slideLeft};
    animation-duration: 1s;
  `;

  const Nav = styled.nav`
    display:flex;
    justify-content: center;
    border: 1px black;
    text-decoration: none;
    width: 30%;
    animation-name: ${fadeIn};
    animation-duration: 2s;
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
    font-family: 'Poppins';
    color: rgb(182, 81, 81);
    text-shadow: 2px 2px 2px white;
    animation-name: ${fadeIn};
    animation-duration: 2s;
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
