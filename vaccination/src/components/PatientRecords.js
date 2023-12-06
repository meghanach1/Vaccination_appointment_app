import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const redTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red color
    },
  },
});

const PatientRecords = () => {
  const location = useLocation();
  const patient_id = location.state?.patient_id;
  const navigate = useNavigate();
  const [patientRecords, setPatientRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/appointment/appointments/${patient_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPatientRecords(data.appointments);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [patient_id]);

  const handleBack = () => {
    // Navigate back to the /manage-patient page
    navigate('/manage-patient', {
      state: {
        patient_id,
      },
    });
  };

  return (
    <ThemeProvider theme={redTheme}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>
       
        {error ? (
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Center Name</TableCell>
                  <TableCell>Selected Date</TableCell>
                  <TableCell>Selected Vaccines</TableCell>
                  <TableCell>Selected Timeslot</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientRecords.map((record, index) => (
                  <TableRow key={record._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{record.center_name}</TableCell>
                    <TableCell>{record.selected_date}</TableCell>
                    <TableCell>{record.selected_vaccines_id.join(', ')}</TableCell>
                    <TableCell>{record.selected_timeslot}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button variant="contained" color="primary" onClick={handleBack} style={{ marginTop: '20px' }}>
          Back
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default PatientRecords;
