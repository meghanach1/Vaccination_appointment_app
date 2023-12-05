import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

import username from '/Users/Megha/Desktop/Vaccination_appointment/vaccination/src/components/assets/username.svg'
import password from '/Users/Megha/Desktop/Vaccination_appointment/vaccination/src/components/assets/password.svg'

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
      const response = await fetch('http://127.0.0.1:5000/admin/login_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          navigate('/manage-admin', {
            state: {
              admin_id: data._id, // Include the _id in the state
            },
          });
          return;
        }
      }
  
      const staffResponse = await fetch('http://127.0.0.1:5000/staff/login_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        if (staffData.role === 'staff') {
          navigate('/manage-staff', {
            state: {
              staff_id: staffData._id, // Include the _id in the state
            },
          });
          return;
        }
      } 
  
      const patientResponse = await fetch('http://127.0.0.1:5000/patient/login_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (patientResponse.ok) {
        const patientData = await patientResponse.json();
        console.log(patientData.patient_id);
        if (patientData.role === 'Patient') {
         navigate('/manage-patient', {
            state: {
              patient_id: patientData.patient_id, 
              // Include the _id in the state
            },
          });
          console.log("loginpatient",patientData.patient_id)
          
          return;
        
        }
       
        
      }
      
      if ((response.ok | staffResponse.ok | patientResponse.ok)) {
        //window.alert('Invalid username or password. If you are a new patient please register and try login.'); // Assuming your backend sends an 'error' field in the response
      }
  
    } catch (error) {
     // window.alert('Invalid username or password. If you are a new patient please register and try login.'); // Assuming your backend sends an 'error' field in the response
      console.error('Error during authentication:', error);
    }
  };

  const handleRegistrationClick = () => {
    navigate('/registration');
    return;
  }
  
  const handleforgotPasswordClick = () => {
    navigate('/forgot-password');
    return;
  }



  return (
    
    <div>
      <header className="login-app-header">
      <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
      Vaccination Appointmnet Booking
      </header>
      <div class="logincontainer">
        <div class="header">
          <div class="logintext"> Sign Up </div>
          <div class="underline"></div>
        </div>
        <div class="inputs">
          <div class="input">
            <img src={username} alt="" />
            <input 
            type="text" 
            placeholder="User Name" 
            name="username"
            value={formData.username}
            onChange={handleChange}/>
          </div>

          <div class="input">
            <img src={password} alt=""></img>
            <input type="password"
             placeholder="Password"
             name="password"
             value={formData.password}
            onChange={handleChange} />
          </div>

          <div className="forgot-password" onClick={handleforgotPasswordClick}>
            Forgot Password?  <span>Click Here!</span></div>
          <div className="submit-container">
            <div className="submit" onClick={handleRegistrationClick}>
              Register here </div>
            <div className="submit" onClick={handleSignIn}>
              Login</div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default LoginPage;
