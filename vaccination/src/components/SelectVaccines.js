// SelectVaccines.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/SelectVaccines.css';

const recommendedVaccines = [
  { id: 1, name: 'Vaccine A', ageRestriction: [18, 65] },
  { id: 2, name: 'Vaccine B', ageRestriction: [18, 50] },
  // Add more recommended vaccines with age restrictions as needed
];

const requiredVaccines = [
  { id: 4, name: 'Vaccine X', ageRestriction: [18, 60] },
  { id: 5, name: 'Vaccine Y', ageRestriction: [50, 80] },
  // Add more required vaccines with age restrictions as needed
];

const SelectVaccines = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData } = location.state || { patientData: {} };
  const { age } = patientData;

  const [selectedVaccines, setSelectedVaccines] = useState([]);
  

  // Filter recommended vaccines based on age
  const filteredRecommendedVaccines = recommendedVaccines.filter((vaccine) =>
    age >= vaccine.ageRestriction[0] && age <= vaccine.ageRestriction[1]
  );

  // Filter required vaccines based on age
  const filteredRequiredVaccines = requiredVaccines.filter((vaccine) =>
    age >= vaccine.ageRestriction[0] && age <= vaccine.ageRestriction[1]
  );

  const handleCheckboxChange = (vaccine) => {
    setSelectedVaccines((prevSelected) => {
      if (prevSelected.includes(vaccine.id)) {
        return prevSelected.filter((id) => id !== vaccine.id);
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, vaccine.id];
        } else {
          return prevSelected;
        }
      }
    });
  };

  const handleContinueScheduling = () => {
    // Navigate to SelectDateTime.js with selected vaccines and pin code
    navigate('/selectdatetime', {
      state: {
        patientData,
        selectedVaccines
       
      },
    });
  };

  return (
    <div align='center'>
      <h1>Select Vaccines.</h1>
      <h2>Choose up to 3 vaccines for the appointment.</h2>

      <div>
        <h3>Recommended Vaccines</h3>
        {filteredRecommendedVaccines.map((vaccine) => (
          <label key={vaccine.id}>
            <input
              type="checkbox"
              checked={selectedVaccines.includes(vaccine.id)}
              onChange={() => handleCheckboxChange(vaccine)}
            />
            {vaccine.name}
          </label>
        ))}
      </div>

      <div>
        <h3>Required Vaccines</h3>
        {filteredRequiredVaccines.map((vaccine) => (
          <label key={vaccine.id}>
            <input
              type="checkbox"
              checked={selectedVaccines.includes(vaccine.id)}
              onChange={() => handleCheckboxChange(vaccine)}
            />
            {vaccine.name}
          </label>
        ))}
      </div>

      <button type="button" onClick={handleContinueScheduling}>
        Continue Scheduling
      </button>
    </div>
  );
};

export default SelectVaccines;
