// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      // Send a request to the server to initiate the password reset
      const response = await axios.post('http://127.0.0.1:5000/api/forgot-password', { email });
     window.alert("Password reset initiated. Check your email for instructions")
      console.log(response.data); // Handle the response accordingly
    } catch (error) {
      console.error('Error initiating password reset:', error.message);
    }
  };
  const handleCancel = () => {
    navigate('/');
  };
  return (
    <div>
      <h2>Forgot Password</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
      <button type="button" onClick={handleCancel}>
          Cancel
        </button>
    </div>
  );
};

export default ForgotPassword;
