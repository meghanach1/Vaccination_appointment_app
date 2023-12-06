import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ManagePatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient_id } = location.state || {};
  console.log("managepatient patientid", patient_id);

  const handleViewProfileClick = () => {
    if (patient_id) {
      navigate(`/manage-patient/profile/${patient_id}`);
      console.log('Navigating to profile with patient_id:', patient_id);
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
    <div>
      <header align='center'>
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
        <h1 align='center'>Manage Patient</h1>
      </header>

      <div>
        <div>
          <form align='center'>
          <button onClick={() => navigate('/profile', { state: { patient_id } })}>
              View My Profile
            </button>
            <br />
            <button onClick={() => navigate('/records', { state: { patient_id } })}>
              View My Appointments
            </button>
            <br />
            <br />
            <button onClick={() => navigate('/schedule-appointment', { state: { patient_id } })}>
              Schedule Appointment
            </button>
            <br />
            <br />
            <button onClick={handleSignOut}>
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagePatient;
