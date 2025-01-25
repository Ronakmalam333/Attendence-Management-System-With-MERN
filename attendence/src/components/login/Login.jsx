
import React from 'react'
import './login.css'

function Login() {
  return (
    <form className='login_form'>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input type="text" placeholder='Enter your UID or Phone'/>

      <label htmlFor="password">Password</label>
      <input type="password" placeholder='Enter your Password'/>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
