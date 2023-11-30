// Appointment.js

import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed

const Appointment = ({
  patientData,
  userRole,
  schedule,
  selectedVaccine,
  selectedDateTime,
  payment,
}) => {
  // State to store the appointment data
  const [appointmentData, setAppointmentData] = useState({
    patientData,
    userRole,
    schedule,
    selectedVaccine,
    selectedDateTime,
    payment,
  });

  // Function to handle saving the appointment data to the database
  const saveAppointment = async () => {
    try {
      // Make a POST request to the server to save the appointment data
      const response = await axios.post('http://127.0.0.1:5000/appointment/insert_appointment', {
        appointmentData,
      });

      // Assuming the server responds with some confirmation or additional data
      console.log('Appointment saved:', response.data);
    } catch (error) {
      console.error('Error saving appointment:', error.message);
    }
  };

  return (
    <div>
      {/* Display selected data from various components */}
      <h2>Patient Details</h2>
      <p>{JSON.stringify(patientData)}</p>

      <h2>User Role</h2>
      <p>{JSON.stringify(userRole)}</p>

      <h2>Schedule</h2>
      <p>{JSON.stringify(schedule)}</p>

      <h2>Selected Vaccine</h2>
      <p>{JSON.stringify(selectedVaccine)}</p>

      <h2>Selected Date and Time</h2>
      <p>{JSON.stringify(selectedDateTime)}</p>

      <h2>Payment</h2>
      <p>{JSON.stringify(payment)}</p>

      {/* Button to save the appointment */}
      <button onClick={saveAppointment}>Save Appointment</button>
    </div>
  );
};

export default Appointment;
