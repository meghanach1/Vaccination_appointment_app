import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    const { username, password } = formData;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/login_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          navigate('/manage-admin');
          return;
        }
      }
  
      const staffResponse = await fetch('http://127.0.0.1:5000/login_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        if (staffData.role === 'staff') {
          navigate('/manage-staff');
          return;
        }
      }
  
      const patientResponse = await fetch('http://127.0.0.1:5000/login_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (patientResponse.ok) {
        const patientData = await patientResponse.json();
        console.log(patientData);
        if (patientData.role === 'Patient') {
          navigate('/manage-patient');
          return;
        }
      }
  
    
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };
  

  return (
    <div>
      <header className="app-header">
        {/* Header content */}
      </header>

      <div className="login-page">
        <div className="login-container">
          <h2 align="center" onClick={handleSignIn}>
            Sign in
          </h2>
          <form>
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
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          </form>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/registration">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
