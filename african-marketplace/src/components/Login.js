import React, { useState } from 'react'
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import border from '../styles/images/border.png';

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({email: '', password: ''});

  const { push } = useHistory();

//Submit Handler posts to Login
  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/users/login", details)
      .then((res) => {
        console.log("Login Details: ", res);
        localStorage.setItem("token", res.data.token);
        push('/dashboard'); 
      })
      .catch((err) => {
        push('/dashboard'); 
        console.log(
          "Error:", 
          err.response.data.message
        );
      });
  };
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
    font-family: 'Poppins';
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
  `;
  const LoginInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px 15px;
    background-color: #d8d7d7;
    border-radius: 8px;
    transition: .3s;
    &:focus {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
    cursor: pointer;
    &:hover {
      background-position: 100% 0%;
    }
  `;
  return (
    <>
      <LogForm onSubmit={submitHandler}>
          <FormInner>
              <LoginH2>Login</LoginH2>
              <FormGroup>
                  <Label htmlFor='email'>Email:</Label>
                  <LoginInput type='email' name ='email' id='email' placeholder='Email Address' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
              </FormGroup>
              <FormGroup>
                  <Label htmlFor='password'>Password:</Label>
                  <LoginInput type='password' name ='password' id='password' placeholder='Password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
              </FormGroup>
              <LoginSubmit type='submit' value='Log In' />
          </FormInner>
      </LogForm>
      <form onSubmit={submitHandler}>
<button>test</button>
      </form>
      </>
  )
}

export default LoginForm;
