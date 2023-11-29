import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MedicalHistory = () => {
  const location = useLocation();
  const { patientData, selectedVaccines, selectedDate, selectedLocation, selectedTimeSlot } = location.state || {};

  // State variables to track user responses
  const [hasChronicCondition, setHasChronicCondition] = useState(null); // Use null for initial unselected state
  const [allergies, setAllergies] = useState('');
  const [previousVaccinations, setPreviousVaccinations] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if the user has selected an option for chronic conditions
    if (hasChronicCondition === null) {
      alert('Please select an option for chronic conditions.');
      return;
    }

    // Perform actions with the collected medical history data
    console.log('Medical History Data:', {
      hasChronicCondition: hasChronicCondition === 'yes',
      allergies,
      previousVaccinations,
      selectedDate,
      selectedLocation,
      selectedTimeSlot,
      // Add other relevant data from previous steps
    });

    // Add logic to navigate to the next step or perform other actions
  };

  return (
    <div align="center">
      <h1>Medical History Questions</h1>

      <form onSubmit={handleSubmit}>
        {/* Medical history question for chronic conditions */}
        <div>
          <label>
            Do you have any chronic medical conditions?
          </label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={hasChronicCondition === 'yes'}
                onChange={() => setHasChronicCondition('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={hasChronicCondition === 'no'}
                onChange={() => setHasChronicCondition('no')}
              />
              No
            </label>
          </div>
        </div>

        {/* Medical history question for allergies */}
        <div>
          <label>
            Do you have any allergies? If yes, please specify.
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>

        {/* Medical history question for previous vaccinations */}
        <div>
          <label>
            Have you received any vaccinations in the past? If yes, please provide details.
          </label>
          <textarea
            value={previousVaccinations}
            onChange={(e) => setPreviousVaccinations(e.target.value)}
          />
        </div>

        {/* Add more questions as needed */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MedicalHistory;
