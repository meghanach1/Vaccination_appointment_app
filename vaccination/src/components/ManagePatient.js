
import './css/ManagePatient.css';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ManagePatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient_id } = location.state || {};

  const handleViewProfileClick = () => {
    if (patient_id) {
      console.log(patient_id)
      navigate(`/manage-patient/profile/${patient_id}`);
    } else {
      console.error('Patient ID is undefined.');
    }

  };

  console.log("manage patient patientid",patient_id)

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

      <div >
        

        <div >
          <form align='center'>
           
          <button onClick={handleViewProfileClick}>View My Profile</button>
      
            <br />
            <br />
           
            <button onClick={() => navigate('/manage-patient/records', { state: { patient_id } })}>
            View My Records
</button>
            <br />
            <br />
            <button onClick={() => navigate('/schedule-appointment', { state: { patient_id } })}>
  Schedule Appointment
</button>
            <br />
            <br />
           
          </form>
        
        </div>
       
      </div>
      
    </div>
  );
};

export default ManagePatient;
