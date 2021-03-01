import React, { useState } from 'react'
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

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
    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
                {/* ERRORS */}
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name ='email' id='email' placeholder='Email Address' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name ='password' id='password' placeholder='Password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type='submit' value='Log In' />
            </div>
        </form>
    )
}

export default LoginForm;
