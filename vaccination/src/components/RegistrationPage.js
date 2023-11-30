// RegistrationPage.js
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
    address:'',
    email: '',
    username: '',
    password: '',
  });
  
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
  
      // Add more cases for other fields if needed
  
      default:
        setFormData({
          ...formData,
          [name]: value,
        });
    }
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div>
      <h1 align='center'>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="text"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Username:
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" onClick={handleSubmit} >Create an Account</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default RegistrationPage;
