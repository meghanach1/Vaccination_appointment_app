import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

const Appointment = () => {
  // Extracting data from location state
  const {
    patientData,
    selectedVaccines,
    selectedDate,
    selectedLocation,
    selectedTimeSlot,
    totalPrice,
  } = useLocation().state || {};
 
  // Extracting properties from patientData
  const { patient_id, user_role } = patientData || {};

  // State to store the appointment data
  const [appointmentData, setAppointmentData] = useState(null);
const navigate = useNavigate();
  // Function to handle saving the appointment data to the database
  const saveAppointment = async () => {
    try {
      // Make a POST request to the server to save the appointment data
      const response = await axios.post('http://127.0.0.1:5000/appointment/insert_appointment', {
        selected_center_id: selectedLocation,
        selected_vaccines_id: selectedVaccines,
        patient_id: patient_id,
        user_booking_date: selectedDate,
        booking_type: 'Online',
        status: 'Completed',
        selected_timeslot: selectedTimeSlot,
        selected_date: selectedDate,
        user_role: user_role,
        amount_paid: totalPrice,
      });

      // Update state with the response data
      setAppointmentData(response.data);

      // Assuming the server responds with some confirmation or additional data
      console.log('Appointment saved:', response.data);
      
    } catch (error) {
      console.error('Error saving appointment:', error.message);
    }
  };

  // Use useEffect to call the saveAppointment function when the component mounts
  useEffect(() => {
    saveAppointment();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      <h1>Appointment Confirmation</h1>

      {/* Display selected data from Payment component */}
    

      <h2>Selected Vaccine</h2>
      <p>{JSON.stringify(selectedVaccines)}</p>

      <h2>Selected Date</h2>
      <p>{JSON.stringify(selectedDate)}</p>

      <h2>Selected Location</h2>
      <p>{JSON.stringify(selectedLocation)}</p>

      <h2>Selected Time Slot</h2>
      <p>{JSON.stringify(selectedTimeSlot)}</p>

      <h2>Total Price</h2>
      <p>{totalPrice}</p>

      {/* Display appointment data saved to the database */}
      {appointmentData && (
        <div>
          <h2>Appointment Data Saved</h2>
          <p>{JSON.stringify(appointmentData)}</p>
        </div>
      )}
    </div>
  );
};

export default Appointment;
