// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './css/LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: 'megha',
    password: 'admin',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your authentication logic here
  };
  const handleSignIn = () => {
    // Replace this with your actual authentication logic
    // For demonstration purposes, I'm checking if the username is 'megha' and the password is 'admin'
    if (formData.username === 'megha' && formData.password === 'admin') {
      // If authentication is successful, navigate to the Schedule Appointment page
      navigate('/manage-patient');
    } else {
      console.log('Authentication failed');
      // Handle authentication failure (show an error message, etc.)
    }
  };



  return (
    <div >
      <header className="app-header">
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
        <h1 className="header-text">Vaccination Appointment Booking System</h1>
      </header>
    
      <div className="login-page">
      <div className="login-container">
        <h2 align='center' onClick={handleSignIn} >Sign in</h2>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="username"
    placeholder="Username"
    value={formData.username}
    onChange={handleChange}
  />
  <br />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
  />
  <br />
  <button type="button" onClick={handleSignIn}>Sign In</button>
</form>
        <p>
           <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p>
          {/* Add a Link to redirect to the RegistrationPage */}
          Don't have an account? <Link to="/registration">Register here</Link>.
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
