import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './css/ScheduleAppointment.css';
import { useLocation } from 'react-router-dom';

const ScheduleAppointment = () => {
  const location = useLocation();
  const { patient_id } = location.state || {};
  console.log("appointment patient", patient_id);
  const navigate = useNavigate();
 
  const [patientFullName, setPatientFullName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  const isFullNameValid = /^[a-zA-Z\s]+$/.test(patientFullName);
  const isAgeValid = /^\d{0,2}$/.test(patientAge);
  const isNotEmpty = patientFullName.trim() !== '' && patientAge.trim() !== '';
  
  console.log("apoointmentpatient",patient_id)
  const handleNext = () => {
    if (isNotEmpty && isFullNameValid && isAgeValid) {
      // Validation passed, navigate to the next page
      navigate('/select-vaccines', {
        state: {
          patientData: {
            fullName: patientFullName,
            age: patientAge,
            patient_id,
          },
        },
      });
    } else {
      // Display an error message or handle invalid input
      window.alert('Invalid input. Please check patient full name and age.');
      console.error('Invalid input. Please check patient full name and age.');
    }
  };
  const handleBack = () => {
    // Navigate back to the /manage-patient page
    navigate('/manage-patient', {
      state: {
        patientData: {
          fullName: patientFullName,
          age: patientAge,
        },
        patient_id,
      },
    });
  };
  return (
    <div className='schedule-container'>
      <header align='center'>
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
         <h1 align='center'>Schedule Appointment</h1>
      </header>
      
      <h2 className='schedule-h2'>Let's get started with the patient's age.</h2>
      <h4 className='schedule-h4'>
        <br />
        Providing your age helps to ensure we're offering the right vaccine(s) for your age.
        <br />
        Age restrictions may vary depending on state or vaccine.
        <br />
        All fields required.
      </h4>
      <form className='schedule-form'>
        <div>
          <label className='schedule-label'>
            Patient's Full Name:
            <input className='schedule-input'
              type="text"
              value={patientFullName}
              onChange={(e) => setPatientFullName(e.target.value.replace(/\d/g, ''))}
            />
          </label>
          {!isFullNameValid && <p className='schedule-p'></p>}
        </div>
        <div>
          <label className='schedule-label'>
            Patient's Age (required):
            <input className='schedule-input'
              type="text"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value.replace(/\D/g, '').substring(0, 2))}
            />
          </label>
          {!isAgeValid && <p className='schedule-p'> Please enter a valid age.</p>}
        </div>
        <button className='schedule-button' type="button" onClick={handleBack}>
          Back 
        </button>
        <button type="button" className='schedule-button' onClick={handleNext} disabled={!isNotEmpty || !isFullNameValid || !isAgeValid}>
          Continue Scheduling
        </button>
        
      </form>
    </div>
  );
};

export default ScheduleAppointment;
