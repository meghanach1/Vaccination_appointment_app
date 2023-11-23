import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ScheduleAppointment.css';

const ScheduleAppointment = () => {
  const navigate = useNavigate();

  const [vaccines, setVaccines] = useState([]);

  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [patientFullName, setPatientFullName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  const isFullNameValid = /^[a-zA-Z\s]+$/.test(patientFullName);
  const isAgeValid = /^\d{0,2}$/.test(patientAge);
  const isNotEmpty = patientFullName.trim() !== '' && patientAge.trim() !== '';

  const handleCheckboxChange = (vaccineId) => {
    setSelectedVaccines((prevSelected) => {
      if (prevSelected.includes(vaccineId)) {
        return prevSelected.filter((id) => id !== vaccineId);
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, vaccineId];
        } else {
          return prevSelected;
        }
      }
    });
  };

  const handleNext = () => {
    if (isNotEmpty && isFullNameValid && isAgeValid) {
      // Validation passed, navigate to the next page
      navigate('/select-vaccines', {
        state: {
          patientData: {
            fullName: patientFullName,
            age: patientAge,
          },
          selectedVaccines,
        },
      });
    } else {
      // Display an error message or handle invalid input
      window.alert('Invalid input. Please check patient full name and age.');
      console.error('Invalid input. Please check patient full name and age.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div align='center'>
      <h1>Schedule Appointment.</h1>
      <h2>Let's get started with the patient's age.</h2>
      <h4><br></br>Providing your age helps to ensure we're offering the right vaccine(s)
        for your age.<br></br>Age restrictions may vary depending on state or vaccine.<br></br>All fields required.</h4>
      <form>
        <div>
          <label>
            Patient's Full Name:
            <input
              type="text"
              value={patientFullName}
              onChange={(e) => setPatientFullName(e.target.value.replace(/\d/g, ''))}
            />
          </label>
          {!isFullNameValid && <p></p>}
        </div>
        <div>
          <label>
            Patient's Age (required):
            <input
              type="text"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value.replace(/\D/g, '').substring(0, 2))}
            />
          </label>
          {!isAgeValid && <p></p>}
        </div>

        {/* Add checkboxes for vaccines here */}

        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleNext} disabled={!isNotEmpty ||!isFullNameValid || !isAgeValid}>
          Continue Scheduling
        </button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;
