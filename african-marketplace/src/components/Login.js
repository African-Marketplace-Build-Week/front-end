import React, { useState } from 'react'

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({email: '', password: ''});
    const submitHandler = e => {
        e.preventDefault();
        Login(details)
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
