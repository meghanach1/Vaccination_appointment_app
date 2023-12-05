import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/globalStyles.css';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation checks

    switch (name) {
      case 'firstName':
      case 'lastName':
        // Allow only letters and spaces or an empty string
        if (/^[A-Za-z\s]*$/.test(value) || value === '') {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case 'dateOfBirth':
        setFormData({
          ...formData,
          dateOfBirth: value,
        });
        break;

      case 'gender':
        setFormData({
          ...formData,
          gender: value,
        });
        break;

      case 'phone':
        // Allow only 10 digits or an empty string
        if (/^\d{0,10}$/.test(value) || value === '') {
          setFormData({
            ...formData,
            phone: value,
          });
        }
        break;

      // ... (other cases)

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
     
      <div className="input">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <br />

      <div className="input">
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
       
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="gender-dropdown" 
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="PreferNotToSay">Preferred Not to Say</option>
        </select>
      </div>
      <br />

      <div className="input">
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <br />

      <div className="input">
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
        <input
          type="username"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
        <input
          type="password"
          placeholder="ConfirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="input">
       
        <input
          type="text"
          placeholder={`Height (${formData.heightUnit})`}
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
        <select
          name="heightUnit"
          value={formData.heightUnit}
          onChange={handleChange}
          className="unit-dropdown"
        >
           <option value="in">in</option>
          <option value="cm">cm</option>
         
        </select>
      </div>
      <br />

      <div className="input">
       
        <input
          type="text"
          placeholder={`Weight (${formData.weightUnit})`}
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <select
          name="weightUnit"
          value={formData.weightUnit}
          onChange={handleChange}
          className="unit-dropdown"
        >
           <option value="lbs">lbs</option>
          <option value="kg">kg</option>
         
        </select>
      </div>
      <br />

      <button type="submit">Create an Account</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default RegistrationPage;
