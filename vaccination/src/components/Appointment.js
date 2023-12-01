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

  const [appointmentData, setAppointmentData] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState('');
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

      // Get selected location name without making an API call
      const locationName = getLocationName(selectedLocation);
      setSelectedLocationName(locationName);

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

  // Helper function to get selected location name without making an API call
  const getLocationName = (locationId) => {
    const locationMap = {
      '655d0bf382d9f899c56eb14a': '123 Main Street, Cityville',
      '655e96d41a133dcc3da819b2': 'Suburb Wellness Hub',
      '655e98a91a133dcc3dae00c7': 'Rural Health Clinic',
      '655e98cd1a133dcc3dae643d': 'University Medical Center',
      '655e9c7c1a133dcc3dbab297': 'Pediatric Vaccination Clinic',
      '655e9dae1a133dcc3dbe21c4': 'Elderly Care Vaccination Center',
    };

    return locationMap[locationId] || 'Unknown Location';
  };

  // Function to navigate back to the "/manage-patient" route
  const navigateToManagePatient = () => {
    navigate('/manage-patient');
  };

  return (
    <div>
      <h1>Appointment Confirmation</h1>

      <form>
        <div>
          <label>Selected Vaccine:</label>
          <label>{JSON.stringify(selectedVaccines)}</label>
        </div>

        <div>
          <label>Selected Date:</label>
          <label>{JSON.stringify(selectedDate)}</label>
        </div>

        <div>
          <label>Selected Location:</label>
          <label>{selectedLocationName}</label>
        </div>

        <div>
          <label>Selected Time Slot:</label>
          <label>{JSON.stringify(selectedTimeSlot)}</label>
        </div>

        <div>
          <label>Total Price:</label>
          <label>{totalPrice}</label>
        </div>
      </form>

      {/* Display appointment data saved to the database */}
      {appointmentData && (
        <div>
          <h2>Appointment Data Saved</h2>
        </div>
      )}

      {/* Back to Home button */}
      <button onClick={navigateToManagePatient}>Back to Home</button>
    </div>
  );
};

export default Appointment;
