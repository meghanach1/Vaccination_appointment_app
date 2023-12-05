import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/SelectVaccines.css';

const SelectVaccines = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData } = location.state || { patientData: {} };
  const age = patientData.age;

  const patient_id  = patientData.patient_id;
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [vaccineData, setVaccineData] = useState({ recommendedVaccines: [], requiredVaccines: [] });
  console.log("selectvaccinepatient",patientData.patient_id)
  console.log("selectvaccinepatient",patient_id)
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

  const getTotalPrice = () => {
    // Calculate the total price of selected vaccines
    return selectedVaccines.reduce((totalPrice, vaccineName) => {
      const selectedVaccine = [...vaccineData.recommended, ...vaccineData.required].find(
        (vaccine) => vaccine.name === vaccineName
      );

      return totalPrice + (selectedVaccine ? selectedVaccine.price : 0);
    }, 0);
  };
  console.log("selectvaccines totatlaprice",getTotalPrice)
  const handleContinueScheduling = () => {
    if (isContinueButtonEnabled) {
      // Navigate to SelectDateTime.js with selected vaccines, pin code, and total price
      navigate('/selectdatetime', {
        state: {
          patientData,
          selectedVaccines,
          totalPrice: getTotalPrice(),
          patient_id,
        },
      });
    }

  };
  const handleBack = () => {
    // Navigate back to the /manage-patient page with patient_id
    navigate('/manage-patient', {
      state: {
        patientData,
        selectedVaccines,
        totalPrice: getTotalPrice(),
        patient_id,
      },
    });
  };

  return (
    <div className="select-vaccines-container">
      <header align='center'>
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
        <h1 align='center'>Select Vaccine</h1>
      </header>

      <h2>Choose up to 3 vaccines for the appointment.</h2>

      {/* Recommended Vaccines */}
      <section className="vaccine-section">
      <div>
        <h3>Recommended Vaccines</h3>
        {vaccineData &&
          vaccineData.recommended &&
          vaccineData.recommended.map((vaccine, index) => (
            <div key={index}>
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
      </section>
      {/* Required Vaccines */}
      <section className="vaccine-section">
      <div>
        <h3>Required Vaccines</h3>
        {vaccineData &&
          vaccineData.required &&
          vaccineData.required.map((vaccine, index) => (
            <div key={index}>
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
      </section>
      {/* Continue Scheduling Button */}
      <button type="button" onClick={handleBack}>
          Back
        </button>
      <button type="button" onClick={handleContinueScheduling} disabled={!isContinueButtonEnabled}>
        Continue Scheduling
      </button>
   {/* Back button */}
   
      {/* Display total price */}
      {isContinueButtonEnabled && (
        <p style={{ marginTop: '10px', color: 'green' }}>
          Total Price: ${getTotalPrice().toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default SelectVaccines;
