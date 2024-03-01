import React from 'react'
import './CSS/loginsignup.css'

export const Login = () => {
  return (
    <div className='loginsinup'>
        <div className="loginsignup-container">
          <h1>Create an Account</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Name'/>
            <input type= "email" placeholder='Email Adress'/>
            <input type="password" placeholder='Password'/>
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">
            Already have an account? <span>Login Here</span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>I agree to the terms of conditions and privacy policy</p>
          </div>
        </div>
    </div>
  )
}
