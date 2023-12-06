import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Checkbox, Button, Container, Grid, Card, CardContent } from '@mui/material';
import './css/SelectVaccines.css';

const SelectVaccines = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData } = location.state || { patientData: {} };
  const age = patientData.age;

  const patient_id = patientData.patient_id;
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [vaccineData, setVaccineData] = useState({ recommendedVaccines: [], requiredVaccines: [] });

  useEffect(() => {
    const fetchVaccineData = async () => {
      try {
        if (age) {
          const response = await fetch(`http://127.0.0.1:5000/vaccine/get-vaccines?age=${age}`);
          const data = await response.json();
          setVaccineData(data);
        }
      } catch (error) {
        console.error('Error fetching vaccine data:', error);
      }
    };

    fetchVaccineData();
  }, [age]);

  const handleCheckboxChange = (vaccine) => {
    setSelectedVaccines((prevSelected) => {
      if (prevSelected.includes(vaccine.name)) {
        return prevSelected.filter((name) => name !== vaccine.name);
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, vaccine.name];
        } else {
          return prevSelected;
        }
      }
    });
  };

  const isContinueButtonEnabled = selectedVaccines.length >= 1 && selectedVaccines.length <= 3;

  const getTotalPrice = () => {
    return selectedVaccines.reduce((totalPrice, vaccineName) => {
      const selectedVaccine = [...vaccineData.recommended, ...vaccineData.required].find(
        (vaccine) => vaccine.name === vaccineName
      );

      return totalPrice + (selectedVaccine ? selectedVaccine.price : 0);
    }, 0);
  };

  const handleContinueScheduling = () => {
    if (isContinueButtonEnabled) {
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
    <Container component="div" className="select-vaccines-container">
      <Typography variant="h4" align="center" gutterBottom>
        Select Vaccine
      </Typography>
      <Typography variant="h6" gutterBottom>
        Choose up to 3 vaccines for the appointment.
      </Typography>

      <Grid container spacing={6}>
        {/* Recommended Vaccines */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recommended Vaccines</Typography>
              {vaccineData &&
                vaccineData.recommended &&
                vaccineData.recommended.map((vaccine, index) => (
                  <div key={index}>
                    <Checkbox
                      checked={selectedVaccines.includes(vaccine.name)}
                      onChange={() => handleCheckboxChange(vaccine)}
                    />
                    <strong>{vaccine.name}</strong>
                    <Typography style={{ color: 'black' }}>
                      {vaccine.description}
                      <br />
                      (Price: ${vaccine.price}, Required Doses: {vaccine.requiredDoses})
                    </Typography>
                  </div>
                ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Required Vaccines */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Required Vaccines</Typography>
              {vaccineData &&
                vaccineData.required &&
                vaccineData.required.map((vaccine, index) => (
                  <div key={index}>
                    <Checkbox
                      checked={selectedVaccines.includes(vaccine.name)}
                      onChange={() => handleCheckboxChange(vaccine)}
                    />
                    <strong>{vaccine.name}</strong>
                    <Typography style={{ color: 'black' }}>
                      {vaccine.description}
                      <br />
                      (Price: ${vaccine.price}, Required Doses: {vaccine.requiredDoses})
                    </Typography>
                  </div>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Continue Scheduling Button */}
      <Button type="button" variant="contained" onClick={handleBack} color='error'>
        Back
      </Button>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleContinueScheduling}
        disabled={!isContinueButtonEnabled}
      >
        Continue Scheduling
      </Button>

      {/* Display total price */}
      {isContinueButtonEnabled && (
        <Typography variant="subtitle1" style={{ marginTop: '10px', color: 'error' }}>
          Total Price: ${getTotalPrice().toFixed(2)}
        </Typography>
      )}
    </Container>
  );
};

export default SelectVaccines;
