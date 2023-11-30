// src/components/ManagePatient.js
import React from 'react';

import { Link } from 'react-router-dom';
import './css/ManagePatient.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ManagePatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
const { patient_id } = location.state || {};
console.log("managepatientpatient",patient_id)
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
           
            <button onClick={() => navigate('/manage-patient/profile', { state: { patient_id } })}>
            View My Profile
</button>
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
