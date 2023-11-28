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
          <Link to="/manage-patients">Manage Patients</Link>
          <Link to="/manage-staff">Manage Vaccination Center Staff</Link>
          <Link to="/manage-payments">Manage Payments</Link>
        </div>

        {/* Additional content or components for each management section */}
        {/* Example: <ManageAppointments /> */}
      </div>
    </div>
  );
};

export default ManageAdmin;
