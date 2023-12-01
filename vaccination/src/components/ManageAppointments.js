import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManagePatients = () => {
  // Example state for storing patient data
  const [patients, setPatients] = useState([]);

  // Example: Fetch patients data from your API or source
  useEffect(() => {
    // Fetch patients data and update the state
    // Example: fetchPatients().then(data => setPatients(data));
  }, []);

  return (
    <div>
      <header className="app-header">
        {/* Header content */}
      </header>

      <div className="manage-patients-page">
        <h2 align="center">Manage Patients</h2>

        <div className="navigation-links">
          <Link to="/manage-appointments">Manage Appointments</Link>
          <Link to="/manage-patients">Manage Patients</Link>
          <Link to="/manage-staff">Manage Vaccination Center Staff</Link>
          <Link to="/manage-payments">Manage Payments</Link>
        </div>

        <div className="patient-list">
          <h3>Patients List</h3>
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                <strong>{patient.name}</strong>
                <p>Appointment Date: {patient.appointmentDate}</p>
                {/* Add more patient details as needed */}
                <Link to={`/edit-appointment/${patient.id}`}>
                  Edit Appointment
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePatients;
