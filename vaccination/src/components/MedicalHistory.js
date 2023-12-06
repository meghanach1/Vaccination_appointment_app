import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  Typography,
} from '@mui/material';

const MedicalHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    patientData,
    selectedVaccines,
    selectedDate,
    selectedLocation,
    selectedTimeSlot,
    totalPrice,
  } = location.state || {};
  const patient_id = patientData.patient_id;
  const initialRadioValue = 'no';
  // State variables to track user responses
  const [hasChronicCondition, setHasChronicCondition] = useState(null);
  const [previousVaccinations, setPreviousVaccinations] = useState('');
  const [hasPreviousVaccinations, setHasPreviousVaccinations] = useState('');
  const [allergiesToFood, setAllergiesToFood] = useState(null);
  const [seriousReactionHistory, setSeriousReactionHistory] = useState(null);
  const [seizureOrNervousProblem, setSeizureOrNervousProblem] = useState(null);
  const [bleedingDisorder, setBleedingDisorder] = useState(null);
  const [pregnancyBreastfeedingStatus, setPregnancyBreastfeedingStatus] =
    useState(null);
  const [formValid, setFormValid] = useState(false);
  const [vaccineDetails, setVaccineDetails] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/patient/save-medical-history',
        {
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
              vaccineDetails:
                hasPreviousVaccinations === 'yes' ? vaccineDetails : null,
            },
          }),
        }
      );
      console.log(response);
      console.log(totalPrice);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Continue with navigation after successful data save
      navigate('/appointment', {
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
            vaccineDetails:
              hasPreviousVaccinations === 'yes' ? vaccineDetails : null,
            patient_id,
          },
        },
      });
    } catch (error) {
      console.error('Error saving medical history data:', error);
      alert('Error saving medical history data. Please try again.');
    }
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
          vaccineDetails:
            hasPreviousVaccinations === 'yes' ? vaccineDetails : null,
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
  hasPreviousVaccinations, // Fix the typo here
  allergiesToFood,
  seriousReactionHistory,
  seizureOrNervousProblem,
  bleedingDisorder,
  pregnancyBreastfeedingStatus,
  vaccineDetails,
]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Let's prepare for your visit
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography variant="h6" style={{ textAlign: 'left' }} gutterBottom>
          You're halfway done. To save you time in person, let's go over these
          questions now. Do your best to answer and we'll confirm later.
        </Typography>

        <FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <FormLabel>
            Have you taken any vaccinations before? If yes, please mention.
          </FormLabel>
          <RadioGroup
            row
            value={hasPreviousVaccinations}
            onChange={(e) => setHasPreviousVaccinations(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
          </RadioGroup>
        </FormControl>

        {/* Show textbox for vaccine details if 'Yes' is selected */}
        {hasPreviousVaccinations === 'yes' && (
          <FormControl style={{ textAlign: 'left' }}>
            <FormLabel>Please mention the vaccine name and dose:</FormLabel>
            <TextField
              type="text"
              value={vaccineDetails}
              onChange={(e) => setVaccineDetails(e.target.value)}
              placeholder="Enter vaccine details"
              variant="outlined"
            />
          </FormControl>
        )}

        {/* Additional new questions */}
        <FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <FormLabel>
            Do you have Chronic Condition
          </FormLabel>
          <RadioGroup
            row
            value={hasChronicCondition}
            onChange={(e) => setHasChronicCondition(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
          </RadioGroup>
        </FormControl>
        <FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <FormLabel>
          Do you have allergies or reactions to any foods, medications, vaccines or latex? (For example: eggs, gelatin, neomycin, thimerosal, etc.) or have you ever had a severe allergic reaction (e.g., anaphylaxis) to something? For example, a reaction for which you were treated with epinephrine or EpiPen®, or for which you had to go to the hospital? If yes, what are you allergic to?
          </FormLabel>
          <RadioGroup
            row
            value={allergiesToFood}
            onChange={(e) => setAllergiesToFood(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
          </RadioGroup>
        </FormControl>
     
<FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
  <FormLabel>
    Have you ever had a serious reaction after receiving a vaccination? Do you have
    a history of fainting, particularly with vaccines? Has any physician or other
    healthcare professional ever cautioned or warned you about receiving certain
    vaccines or receiving vaccines outside of a medical setting?
  </FormLabel>
  <RadioGroup
    row
    value={seriousReactionHistory}
    onChange={(e) => setSeriousReactionHistory(e.target.value)}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
    <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
  </RadioGroup>
</FormControl>

{/* Additional new questions */}
<FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
  <FormLabel>
    Have you had a seizure or a brain or other nervous system problem or Guillain
    Barre?
  </FormLabel>
  <RadioGroup
    row
    value={seizureOrNervousProblem}
    onChange={(e) => setSeizureOrNervousProblem(e.target.value)}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
    <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
  </RadioGroup>
</FormControl>

{/* Additional new questions */}
<FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
  <FormLabel>
    Do you have a bleeding disorder or take blood thinners such as Warfarin/Coumadin?
  </FormLabel>
  <RadioGroup
    row
    value={bleedingDisorder}
    onChange={(e) => setBleedingDisorder(e.target.value)}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
    <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
  </RadioGroup>
</FormControl>
{/* Repeat the pattern for the other new questions */}
<FormControl style={{ textAlign: 'left', fontWeight: 'bold' }}>
  <FormLabel>
    Are you currently pregnant or breastfeeding or is there a chance you could
    become pregnant during the next month?
  </FormLabel>
  <RadioGroup
    row
    value={pregnancyBreastfeedingStatus}
    onChange={(e) => setPregnancyBreastfeedingStatus(e.target.value)}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
    <FormControlLabel value="idk" control={<Radio />} label="I don't know" />
  </RadioGroup>
</FormControl>

{/* Back button */}
<Button type="button" onClick={handleBack} variant="contained" color='error'>
  Back
</Button>
{/* Submit button */}
<Button type="submit" variant="contained" disabled={!formValid} color='error'>
  Confirm Appointment
</Button>
</form>
</Container>
);
};

export default MedicalHistory;

