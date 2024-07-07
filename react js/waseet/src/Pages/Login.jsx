import React, {useState, useEffect} from 'react'
import './CSS/loginsignup.css'
import axios from 'axios'

export const Login = () => {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setloginError] = useState(false)
  const [loginFormata, setLoginFormData] = useState({
    'username': '',
    'password': ''
  })
  
  // updates the username and password depending on input change then sets it to loginformdata
  const handleInput = (event) =>{
    setLoginFormData({
      ...loginFormata, 
      [event.target.name] : event.target.value
    })}

  const handleLogin = async (event) =>{
    setIsLoggedIn(true); //temporary loading state
    const loginData = {
      username: loginFormata.username,
      password: loginFormata.password,
    };
    //submit login data
    try{
      const response = await axios.post(baseUrl+'token/', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setloginError(false)
      localStorage.setItem('user_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_login', true);
      localStorage.setItem('username', loginData.username);
      handleLoginSuccess();
    }catch(error) {
      setloginError(true)
      localStorage.setItem('user_login', false);
      console.log('login error was found:', error)
      setIsLoggedIn(false)
    }}

    const getAuthToken = () => {
      return localStorage.getItem('user_token');
    };
  

    const login_success = () => {
      const token = getAuthToken(); // Function to retrieve stored access token
      return !!token; // Check if token exists (truthy value)
    };

    const handleLoginSuccess = () => {
      if (login_success()) {
        console.log("Login successful!");
        //window.location.href = '/'; // Redirect to homepage
      } else {
        console.error("Login failed or token is missing/invalid.");
      }

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
          {loginError && <p className='error-message'>invalid username or password</p>}
          <p className="loginsignup-login">
          </p>
        </div>
    </div>
  )

  }