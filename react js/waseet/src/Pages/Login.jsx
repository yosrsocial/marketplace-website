import React, {useState, useEffect} from 'react'
import './CSS/loginsignup.css'
import axios from 'axios'

export const Login = () => {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginFormata, setLoginFormData] = useState({
    'username': '',
    'password': ''
  })
  
  const handleInput = (event) =>{
    setLoginFormData({
      ...loginFormata, 
      [event.target.name] : event.target.value
    })}

  const handleLogin = (event) =>{
    setIsLoggedIn(true);
    const formData = new FormData()
    formData.append('username', loginFormata.username)
    formData.append('password', loginFormata.password)
    
    axios.post(baseUrl+'users/login/', formData)
    .then(function(response) {
      console.log(response)
    })
    .catch( function(error) {
      console.log(error)
    })
  }

  const buttonEnable = (loginFormata.username != '') && (loginFormata.password != '')


  return (
    <div className='loginsinup'>
        <div className="loginsignup-container">
          <h1>Login To Your Account</h1>
          <div className="loginsignup-fields">
            <input type="text" name='username' placeholder='Name' value={loginFormata.username} onChange={handleInput}/>
            <input type="password" name='password' placeholder='Password' value={loginFormata.password} onChange={handleInput}/>
          </div>
          <button className='login-button' type='button' disabled={!buttonEnable} onClick={handleLogin}>Login</button>
          <p className="loginsignup-login">
          </p>
        </div>
    </div>
  )
}
