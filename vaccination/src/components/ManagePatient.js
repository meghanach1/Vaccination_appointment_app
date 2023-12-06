import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';

// Define a red color theme
const redTheme = createTheme({
  palette: {
    primary: {
      main: '#ff1900', // Red color
    },
  },
});

const ManagePatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient_id } = location.state || {};

  const handleViewProfileClick = () => {
    if (patient_id) {
      navigate(`/manage-patient/profile/${patient_id}`);
    } else {
      console.error('Patient ID is undefined.');
    }
  };

  const handleSignOut = () => {
    // Perform sign-out logic here, e.g., clearing session, removing tokens, etc.
    // For simplicity, let's just redirect to the login page.
    navigate('/');
  };

  return (
    <ThemeProvider theme={redTheme}>
      <Container>
        <header style={{ textAlign: 'center', margin: '20px 0' }}>
          <img
            src={require('./images/logo.svg').default}
            alt="Vaccination Logo"
            className="header-logo"
          />
          <Typography variant="h4">Manage Patient</Typography>
        </header>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/profile', { state: { patient_id } })} style={{ marginBottom: '10px' }}>
                View My Profile
              </Button>
              <br />
              <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/records', { state: { patient_id } })} style={{ marginBottom: '10px' }}>
                View My Appointments
              </Button>
              <br />
              <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/schedule-appointment', { state: { patient_id } })} style={{ marginBottom: '10px' }}>
                Schedule Appointment
              </Button>
              <br />
              <Button variant="contained" color="primary" fullWidth onClick={handleSignOut}>
                Sign Out
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ManagePatient;
