// src/components/ManagePatient.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/ManagePatient.css';

const ManagePatient = () => {
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
            <Link to="/manage-patient/profile">
              <button>View My Profile</button>
            </Link>
            <br />
            <br />
            <Link to="/manage-patient/records">
              <button>View My Records</button>
            </Link>
            <br />
            <br />
            <Link to="/schedule-appointment">
              <button>Schedule Appointment</button>
            </Link>
            <br />
            <br />
           
          </form>
        
        </div>
       
      </div>
      
    </div>
  );
};

export default ManagePatient;
