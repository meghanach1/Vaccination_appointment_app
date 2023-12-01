import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MedicalHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { patientData, selectedVaccines, selectedDate, selectedLocation, selectedTimeSlot,totalPrice } = location.state || {};
  const patient_id  = patientData.patient_id;
  const initialRadioValue = 'no'; 
  // State variables to track user responses
  const [hasChronicCondition, setHasChronicCondition] = useState(null);
  const [previousVaccinations, setPreviousVaccinations] = useState('');
const [hasPreviousVaccinations, setHasPreviousVaccinations] = useState('');
  const [allergiesToFood, setAllergiesToFood] = useState(null);
  const [seriousReactionHistory, setSeriousReactionHistory] = useState(null);
  const [seizureOrNervousProblem, setSeizureOrNervousProblem] = useState(null);
  const [bleedingDisorder, setBleedingDisorder] = useState(null);
  const [pregnancyBreastfeedingStatus, setPregnancyBreastfeedingStatus] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [vaccineDetails, setVaccineDetails] = useState('');
  console.log("medical history totatlaprice",totalPrice)
  // Function to handle form submission
  console.log('selectedDate:', selectedDate);
  console.log('selectedLocation:', selectedLocation);
  console.log('selectedTimeSlot:', selectedTimeSlot);
  console.log('patient_id:', patient_id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/patient/save-medical-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: patientData.id, // Assuming patient ID is present in patientData
          selectedVaccines,
          medicalHistoryData: {
            hasChronicCondition,
            hasPreviousVaccinations,
            allergiesToFood,
            seriousReactionHistory,
            seizureOrNervousProblem,
            bleedingDisorder,
            pregnancyBreastfeedingStatus,
            selectedDate,
            selectedLocation,
            selectedTimeSlot,
            vaccineDetails: hasPreviousVaccinations === 'yes' ? vaccineDetails : null,

          },
        }),
      });
      console.log(response)
      console.log(totalPrice)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Continue with navigation after successful data save
      navigate('/payment', {
        state: {
          patientData,
          totalPrice,
          selectedVaccines,
          selectedDate,
          selectedTimeSlot,
          selectedLocation,
          medicalHistoryData: {
            hasChronicCondition,
            hasPreviousVaccinations,
            allergiesToFood,
            seriousReactionHistory,
            seizureOrNervousProblem,
            bleedingDisorder,
            pregnancyBreastfeedingStatus,
            selectedDate,
            selectedLocation,
            selectedTimeSlot,
            vaccineDetails: hasPreviousVaccinations === 'yes' ? vaccineDetails : null,
            patient_id,
          },
        },
      });
    } catch (error) {
      console.error('Error saving medical history data:', error);
      alert('Error saving medical history data. Please try again.');
    }
  };
  const saveMedicalHistoryData = (data) => {
    // Replace this with your actual logic for saving data to your backend or state
    console.log('Saving Medical History Data:', data);
    // Example of saving to state (replace with your actual state management logic)
    // setMedicalHistoryData(data);
  };

// Function to update form validity based on the answers
const updateFormValidity = () => {
  console.log('Updating form validity');

  const isValid =
    hasChronicCondition !== null &&
    allergiesToFood !== null &&
    seriousReactionHistory !== null &&
    seizureOrNervousProblem !== null &&
    bleedingDisorder !== null &&
    pregnancyBreastfeedingStatus !== null &&
    (hasPreviousVaccinations === 'yes' ? vaccineDetails.trim() !== '' : true);
  
    setFormValid(isValid);
};

  
const handleBack = () => {
  // Navigate back to the /manage-patient page with patient_id
  navigate('/manage-patient', {
    state: {
      patientData,
      totalPrice,
      selectedVaccines,
      selectedDate,
      selectedTimeSlot,
      selectedLocation,
      medicalHistoryData: {
        hasChronicCondition,
        hasPreviousVaccinations,
        allergiesToFood,
        seriousReactionHistory,
        seizureOrNervousProblem,
        bleedingDisorder,
        pregnancyBreastfeedingStatus,
        selectedDate,
        selectedLocation,
        selectedTimeSlot,
        vaccineDetails: hasPreviousVaccinations === 'yes' ? vaccineDetails : null,
        patient_id,
      },
    },
  });
};

  useEffect(() => {
    console.log('useEffect updating form validity');
    updateFormValidity();
  }, [
    hasChronicCondition,
    previousVaccinations,
    allergiesToFood,
    seriousReactionHistory,
    seizureOrNervousProblem,
    bleedingDisorder,
    pregnancyBreastfeedingStatus,
    hasPreviousVaccinations,
    vaccineDetails,
  ]);

  return (
    <div align="center">
      
      <header align='center'>
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
        <h1 align='center'>Let's prepare for your visit</h1>
      </header>
      
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'left' }}>You're halfway done. To save you time in person, let's go over these questions now. Do your best to answer and we'll confirm later.</h3>

        <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
            Have you taken any vaccinations before? If yes, please mention.
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={hasPreviousVaccinations === 'yes'}
          
                onChange={() => setHasPreviousVaccinations('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={hasPreviousVaccinations === 'no'}
                onChange={() => setHasPreviousVaccinations('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={hasPreviousVaccinations === 'idk'}
                onChange={() => setHasPreviousVaccinations('idk')}
              />
              I don't know
            </label>
          </div>
        </div>

        {/* Show textbox for vaccine details if 'Yes' is selected */}
        {hasPreviousVaccinations === 'yes' && (
          <div style={{ textAlign: 'left' }}>
            <label>
              Please mention the vaccine name and dose:
            </label>
            <input
              type="text"
              value={vaccineDetails}
            
              onChange={(e) => setVaccineDetails(e.target.value)}
              
              placeholder="Enter vaccine details"
            />
          </div>
        )}

<div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          Do you have allergies or reactions to any foods, medications, vaccines or latex? (For example: eggs, gelatin, neomycin, thimerosal, etc.) or have you ever had a severe allergic reaction (e.g., anaphylaxis) to something? For example, a reaction for which you were treated with epinephrine or EpiPen®, or for which you had to go to the hospital? If yes, what are you allergic to?
          </label>
          <div style={{ textAlign: 'left' }}>
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
            <label>
              <input
                type="radio"
                value="idk"
                checked={hasChronicCondition === 'idk'}
                onChange={() => setHasChronicCondition('idk')}
              />
              I don't know
            </label>
          </div>
        </div>
        {/* ... (Previous questions) */}
        <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          Do you have allergies or reactions to any foods, medications, vaccines or latex? (For example: eggs, gelatin, neomycin, thimerosal, etc.) or have you ever had a severe allergic reaction (e.g., anaphylaxis) to something? For example, a reaction for which you were treated with epinephrine or EpiPen®, or for which you had to go to the hospital? If yes, what are you allergic to?
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={allergiesToFood === 'yes'}
                onChange={() => setAllergiesToFood('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={allergiesToFood === 'no'}
                onChange={() => setAllergiesToFood('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={allergiesToFood === 'idk'}
                onChange={() => setAllergiesToFood('idk')}
              />
              I don't know
            </label>
          </div>
        </div>
        {/* New questions with radio buttons */}
        <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          Have you ever had a serious reaction after receiving a vaccination? Do you have a history of fainting, particularly with vaccines? Has any physician or other healthcare professional ever cautioned or warned you about receiving certain vaccines or receiving vaccines outside of a medical setting?
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={seriousReactionHistory === 'yes'}
                onChange={() => setSeriousReactionHistory('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={seriousReactionHistory === 'no'}
                onChange={() => setSeriousReactionHistory('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={seriousReactionHistory === 'idk'}
                onChange={() => setSeriousReactionHistory('idk')}
              />
              I don't know
            </label>
          </div>
        </div>

        {/* Additional new questions */}
        
         {/* Additional new questions */}
         <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          Have you had a seizure or a brain or other nervous system problem or Guillain Barre?
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={seizureOrNervousProblem === 'yes'}
                onChange={() => setSeizureOrNervousProblem('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={seizureOrNervousProblem === 'no'}
                onChange={() => setSeizureOrNervousProblem('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={seizureOrNervousProblem === 'idk'}
                onChange={() => setSeizureOrNervousProblem('idk')}
              />
              I don't know
            </label>
          </div>
        </div>
         {/* Additional new questions */}
         <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          Do you have a bleeding disorder or take blood thinners such as Warfarin/Coumadin?
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={bleedingDisorder === 'yes'}
                onChange={() => setBleedingDisorder('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={bleedingDisorder === 'no'}
                onChange={() => setBleedingDisorder('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={bleedingDisorder === 'idk'}
                onChange={() => setBleedingDisorder('idk')}
              />
              I don't know
            </label>
          </div>
        </div>
        {/* Repeat the pattern for the other new questions */}
        <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <label>
          
          Are you currently pregnant or breastfeeding or is there a chance you could become pregnant during the next month?
          </label>
          <div style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={pregnancyBreastfeedingStatus === 'yes'}
                onChange={() => setPregnancyBreastfeedingStatus('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={pregnancyBreastfeedingStatus === 'no'}
                onChange={() => setPregnancyBreastfeedingStatus('no')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="idk"
                checked={pregnancyBreastfeedingStatus === 'idk'}
                onChange={() => setPregnancyBreastfeedingStatus('idk')}
              />
              I don't know
            </label>
          </div>
        </div>

      
        <button type="button" onClick={handleBack}>
          Back 
        </button>
        {/* Submit button */}
        <button type="submit" disabled={!formValid} >Continue to Payment</button>
      </form>
    </div>
  );
};

export default MedicalHistory;
