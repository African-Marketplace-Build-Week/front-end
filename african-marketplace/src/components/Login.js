import React, { useState } from 'react'
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({email: '', password: ''});

    const { push } = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        axiosWithAuth()
          .post("/users/login", details)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            push(`${res.data.user.id}/dashboard`);
          })
          .catch((err) => {
            console.log(
              "Error:",
              err.response.data.message
            );
          });  
    }
    const LogForm = styled.form`
      display: block;
      position: relative;
      margin: 20px;
      width: 40%;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        z-index: 1;
        background-image: linear-gradient(to bottom right, #ffce00, #fe4880);
      }
    `;
    const FormInner = styled.form`
      position: relative;
      display: block;
      z-index: 2;
      background-color: white;
      padding: 30px;
    `;
    const LoginH2 = styled.h2`
      color: #fe4880;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 30px;
    `;
    const FormGroup = styled.div`
      display: block;
      width: 300px;
      margin-bottom: 15px;
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
      padding: 10px 15px;
      border-radius: 8px;
      background-image: linear-gradient(to right, #ffce00 50%, #ffce00 50%, #fe4880);
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
        <LogForm onSubmit={submitHandler}>
            <FormInner>
                <LoginH2>Login</LoginH2>
                <FormGroup>
                    <label htmlFor='email'>Email:</label>
                    <LoginInput type='email' name ='email' id='email' placeholder='Email Address' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor='password'>Password:</label>
                    <LoginInput type='password' name ='password' id='password' placeholder='Password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </FormGroup>
                <LoginSubmit type='submit' value='Log In' />
            </FormInner>
        </LogForm>
    )
}

export default LoginForm;
