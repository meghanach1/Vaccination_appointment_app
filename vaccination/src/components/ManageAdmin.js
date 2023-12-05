import React from 'react';
import { Link } from 'react-router-dom';


const ManageAdmin = () => {
  return (
    <div>
      <header className="app-header">
        {/* Header content */}
      </header>

      <div className="manage-admin-page">
        <h2 align="center">Manage Admin Dashboard</h2>

        <div className="navigation-links">
          <Link to="/manage-appointments">Manage Appointments</Link>
          <br/>
          <Link to="/manage-patients">Manage Patients</Link>
          <br/>
          <Link to="/manage-staff">Manage Vaccination Center Staff</Link>
          <br/>
          <Link to="/manage-payments">Manage Payments</Link>
          <br/>
        </div>

        {/* Additional content or components for each management section */}
        {/* Example: <ManageAppointments /> */}
      </div>
    </div>
  );
};

export default ManageAdmin;
