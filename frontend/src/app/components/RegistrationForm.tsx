// RegistrationForm.tsx
import React, { useState } from 'react';
import "../styles/RegistrationForm.css"
interface RegistrationFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegistrationForm:React.FC<RegistrationFormProps>  = ({setIsAuthenticated, setShowRegistrationForm}) => {
  const apiUrl = 'http://localhost:8000/api/auth/register';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        // Registration successful
        setIsAuthenticated(true);
        alert('Registration successful');
        setUsername('');
        setPassword('');
      } 
      else if (response.status === 400) {
        alert('Username already exists');
      }
      else {
        // Registration failed
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSwitchLogin = () => {
    console.log("handleSwitchTriggered");
    setShowRegistrationForm(false);
  }

  return (
    <div className='registration-form-container'>
      <h2 className='registration-form-title'>Register</h2>
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
          className='registration-input'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className='registration-button' onClick={handleRegistration}>Register</button>
      </div>
      <div className='registration-login-text'>
        <p>Already Registered? <button className='registration-login-button' onClick={handleSwitchLogin}>Login</button></p>
      </div>
    </div>
  );
};

export default RegistrationForm;