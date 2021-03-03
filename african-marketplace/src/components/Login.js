import React, { useState } from 'react'
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import border from '../styles/images/border.png';


  const LogForm = styled.form`
    display: block;
    position: relative;
    margin: 20px;
    width: 40%;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: 1;
    border-style: solid;
    border-width: 20px;
    border-image: url(${border});
    border-image-slice: 80;
    @media (max-width: 800px) {
      width: 70%;
    }
    @media (max-width: 450px) {
      border-image: none;
      border: none;
      width: 80%;
    }
  `;
  const FormInner = styled.form`
    position: relative;
    display: block;
    z-index: 2;
    ;
    padding: 30px;
  `;
  const LoginH2 = styled.h2`
    color: rgb(182, 81, 81);
    font-size: 2rem;
    text-shadow: 1px 1px 1px white;
    font-weight: bold;
    margin-bottom: 30px;
    font-family: 'Lobster';
    @media (max-width: 450px) {
      font-size: 1.5rem;
    }
  `;
  const FormGroup = styled.div`
    display: block;
    width: 300px;
    margin-bottom: 15px;
    text-align: left;
  `;
  const Label = styled.label`
    color: black;
    font-size: 1.2rem;
    font-family: 'Poppins';
    @media (max-width: 450px) {
      font-size: 1rem;
    }
  `;
  const LoginInput = styled.input`
    display: block;
    width: 20vw;
    padding: 10px 15px;
    background-color: #d8d7d7;
    border-radius: 8px;
    transition: .3s;
    &:focus {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 800px) {
      width: 37vw;
    }
    @media (max-width: 450px) {
      width: 70vw;
    }
  `;
  const LoginSubmit = styled.input`
    display: inline-block;
    padding: 10px 25px;
    border-radius: 3px;
    background-image: linear-gradient(to right, rgb(182, 81, 81) 50%, rgb(182, 81, 81) 50%, #ffffff);
    background-size: 200%;
    background-position: 0%;
    transition: .5s;
    color: white;
    font-weight: bold;
    font-family: 'Poppins';
    cursor: pointer;
    &:hover {
      background-position: 100% 0%;
    }
  `;
  
function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({email: '', password: ''});

  const { push } = useHistory();

//Submit Handler posts to Login
  const submitHandler = (e) => {
    push('/dashboard')
    e.preventDefault();
    axiosWithAuth()
      .post("/users/login", details)
      .then((res) => {
        console.log("Login Details: ", res);
        localStorage.setItem("token", res.data.token);
        push(); 
      })
      .catch((err) => {
        console.log(
          "Error:", 
          err.response.data.message
        );
      });
  };

//onChange handler
  const changeHandler = e => {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value})
  };

  return (
    <>
      <LogForm onSubmit={submitHandler}>
          <FormInner>
              <LoginH2>Login</LoginH2>
              <FormGroup>
                  <Label htmlFor='email'>Email:
                    <LoginInput type='email' name ='email' id='email' placeholder='Email Address' onChange={changeHandler} value={details.email}/>
                  </Label>
              </FormGroup>
              <FormGroup>
                  <Label htmlFor='password'>Password:
                    <LoginInput type='password' name ='password' id='password' placeholder='Password' onChange={changeHandler} value={details.password}/>
                  </Label>
              </FormGroup>
              <LoginSubmit type='submit' onClick={submitHandler} value='Log In'   />
          </FormInner>
      </LogForm>
      
      </>
  )
}

export default LoginForm;