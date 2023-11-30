import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/SelectVaccines.css';

const SelectVaccines = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData } = location.state || { patientData: {} };
  const age = patientData.age ;
 
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [vaccineData, setVaccineData] = useState({ recommendedVaccines: [], requiredVaccines: [] });

  useEffect(() => {
    const fetchVaccineData = async () => {
      try {
        // Fetch recommended and required vaccines based on the patient's age
        if (age) {
          const response = await fetch(`http://127.0.0.1:5000/vaccine/get-vaccines?age=${age}`);
          const data = await response.json();
          console.log('Vaccine Data:', data);
          setVaccineData(data);
        }
      } catch (error) {
        console.error('Error fetching vaccine data:', error);
      }
    };

    fetchVaccineData();
  }, [age]); // Include 'age' as a dependency to re-run the effect when 'age' changes

  const handleCheckboxChange = (vaccine) => {
    setSelectedVaccines((prevSelected) => {
      if (prevSelected.includes(vaccine.name)) {
        // Deselect if already selected
        return prevSelected.filter((name) => name !== vaccine.name);
      } else {
        // Select if not selected and less than 3 selected
        if (prevSelected.length < 3) {
          return [...prevSelected, vaccine.name];
        } else {
          // If already selected 3, do nothing
          return prevSelected;
        }
      }
    });
  };
   const isContinueButtonEnabled = selectedVaccines.length >= 1 && selectedVaccines.length <= 3;
  const handleContinueScheduling = () => {
    if (isContinueButtonEnabled) {
      // Navigate to SelectDateTime.js with selected vaccines and pin code
      navigate('/selectdatetime', {
        state: {
          patientData,
          selectedVaccines,
        },
      });
    }
  };

  return (
    <div align='center'>
      <h1>Select Vaccines.</h1>
      <h2>Choose up to 3 vaccines for the appointment.</h2>
    <div >
  <h3>Recommended Vaccines</h3>
  {vaccineData && vaccineData.recommended && vaccineData.recommended.map((vaccine, index) => (
    <div key={index} >
      <label>
        <input
          type="checkbox" 
          checked={selectedVaccines.includes(vaccine.name)}
          onChange={() => handleCheckboxChange(vaccine)}
        />
        <strong>{vaccine.name}</strong>
      </label>
      <p style={{ color: 'black' }}>
        {vaccine.description}
        <br />
        (Price: ${vaccine.price}, Required Doses: {vaccine.requiredDoses})
      </p>
    </div>
  ))}
</div>

<div>
  <h3>Required Vaccines</h3>
  {vaccineData && vaccineData.required && vaccineData.required.map((vaccine, index) => (
    <div key={index} >
      <label>
        <input
          type="checkbox"
          checked={selectedVaccines.includes(vaccine.name)}
          onChange={() => handleCheckboxChange(vaccine)}
        />
        <strong>{vaccine.name}</strong>
      </label>
      <p style={{ color: 'black' }}>
        {vaccine.description}
        <br />
        (Price: ${vaccine.price}, Required Doses: {vaccine.requiredDoses})
      </p>
    </div>
  ))}
</div>
 <button type="button" onClick={handleContinueScheduling} disabled={!isContinueButtonEnabled}>
        Continue Scheduling
      </button>
    </div>
  );
};

export default SelectVaccines;
