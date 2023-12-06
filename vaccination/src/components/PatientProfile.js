import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Typography, TextField, Button, Grid, createTheme, ThemeProvider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
  const location = useLocation();
  const patient_id = location.state?.patient_id;
  const [patientDetails, setPatientDetails] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/patient/${patient_id}`);
        setPatientDetails(response.data);
        setEditableFields({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth,
          address: response.data.address,
          gender: response.data.gender,
          phone: response.data.phone,
          height: response.data.height,
          heightUnit: response.data.heightUnit,
          weight: response.data.weight,
          weightUnit: response.data.weightUnit,
        });
      } catch (error) {
        console.error('Error fetching patient details:', error.message);
      }
    };

    if (patient_id) {
      fetchPatientDetails();
    }
  }, [patient_id]);

  const handleFieldChange = (field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleBack = () => {
    // Navigate back to the /manage-patient page
    navigate('/manage-patient', {
      state: {
        patient_id,
      },
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/patient/api/update-patient/${patient_id}`, editableFields);
      window.alert('Changes saved successfully!');
      setIsEditMode(false);

      // Fetch updated patient details after saving successfully
      const response = await axios.get(`http://127.0.0.1:5000/patient/${patient_id}`);
      setPatientDetails(response.data);
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000', // Red color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            Patient Profile
          </Typography>
          {patientDetails ? (
            <Box width={400} mx="auto">
              {!isEditMode ? (
                <>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>First Name:</strong> {patientDetails.firstName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Last Name:</strong> {patientDetails.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Email:</strong> {patientDetails.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Date Of Birth:</strong> {patientDetails.dateOfBirth}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Address:</strong> {patientDetails.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Gender:</strong> {patientDetails.gender}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Phone:</strong> {patientDetails.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Height:</strong> {`${patientDetails.height} ${patientDetails.heightUnit}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="center">
                        <strong>Weight:</strong> {`${patientDetails.weight} ${patientDetails.weightUnit}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleEditClick}>
                      Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleBack} sx={{ marginLeft: 1 }}>
                      Back
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.firstName}
                          onChange={(e) => handleFieldChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.lastName}
                          onChange={(e) => handleFieldChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Date Of Birth"
                          variant="outlined"
                          fullWidth
                          size="small"
                          type="date"
                          value={editableFields.dateOfBirth}
                          onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Address"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.address}
                          onChange={(e) => handleFieldChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Gender"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.gender}
                          onChange={(e) => handleFieldChange('gender', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Phone"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Height"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.height}
                          onChange={(e) => handleFieldChange('height', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Weight"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={editableFields.weight}
                          onChange={(e) => handleFieldChange('weight', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2} textAlign="center">
                      <Button variant="contained" color="primary" onClick={handleBack}>
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ marginLeft: 1 }}>
                        Save Changes
                      </Button>
                    </Box>
                  </form>
                </>
              )}
            </Box>
          ) : (
            <p>Loading patient details...</p>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default PatientProfile;
