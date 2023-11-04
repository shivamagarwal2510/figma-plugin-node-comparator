// Login.tsx
import React, { useState } from 'react';
import "../styles/LoginForm.css"
interface LoginFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginFormProps> = ({setIsAuthenticated, setShowRegistrationForm}) => {
  const apiUrl = 'http://localhost:8000/api/auth/login';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send a POST request to /api/auth/login with username and password
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Login successful, save the token and show the main UI
        await response.json();
        // const token = data.token;
        alert("Login Successfull");
        setIsAuthenticated(true);
        // Redirect to the main UI
      } else {
        // Login failed
        alert('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSwitchRegister = () => {
    console.log("handleSwitchTriggered");
    setShowRegistrationForm(true);
  }

  return (
    <div className='registration-form-container'>
      <h2 className='registration-form-title'>Login </h2>
      <div>
        <input
          className='registration-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className='registration-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className='registration-button' onClick={handleLogin}>Login</button>
      </div>
      <div className='registration-login-text'>
        <p>Click to Create Account <button className='registration-login-button' onClick={handleSwitchRegister}>Register</button></p>
      </div>
    </div>
  );
};

export default Login;