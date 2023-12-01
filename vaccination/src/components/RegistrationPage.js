import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/globalStyles.css';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '', 
  });
  const [registrationConfirmed, setRegistrationConfirmed] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation checks
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'gender':
        // Allow only letters and spaces or an empty string
        if (/^[A-Za-z\s]*$/.test(value) || value === '') {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case 'age':
        // Allow only numbers or an empty string
        if (/^\d*$/.test(value) || value === '') {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case 'dateOfBirth':
        // Allow any string (you may want to use a date picker for a more robust solution)
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      case 'phone':
        // Allow only 10 digits or an empty string
        if (/^\d{0,10}$/.test(value) || value === '') {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case 'email':
        // Allow any string (you may want to use a more robust email validation)
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      case 'username':
        // Allow any string (you may want to use a more robust password validation)
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      case 'password':
        // Allow any string (you may want to use a more robust password validation)
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      case 'confirmPassword':
        // Allow any string (you may want to use a more robust password validation)
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password must match.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/patient/create_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 align='center'>Registration Page</h1>
     
      <div class="input">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange} />
        </div>

        <br />

        <div class="input">
          <input type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} />
        </div>
        <br />
        
     

        <div class="input">
          <input type="text"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
          <input type="text"
            placeholder="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
          <input type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
          <input type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange} />
        </div>

        <br />

        <div class="input">
          <input type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
        <input type="email"
         placeholder="Email Address"
         name="email"
         value={formData.email}
         onChange={handleChange} />
     </div>
        <br />

        <div class="input">
          <input type="username"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
        <input type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange} />
        </div>
        <br />

        <div class="input">
          <input
            type="password"
            placeholder="ConfirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Create an Account</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      

      {registrationConfirmed && (
        <div>
          <h2>Registration Confirmed</h2>
          <p>Your registration was successful!</p>
        </div>
      )}
    </form>
  );
};

export default RegistrationPage;
