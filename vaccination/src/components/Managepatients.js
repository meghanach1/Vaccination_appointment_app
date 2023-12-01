// ManagePatients.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import './css/ManagePatients.css'; // Import your CSS file

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByFirstname, setSearchByFirstname] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    // Fetch patients from the backend when the component mounts
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/patient/get_all_patients');

      // Access the 'patients' array from the response
      const patientsData = response.data.patients || [];

      setPatients(patientsData);
      setFilteredPatients(patientsData); // Initialize filteredPatients with all patients
      console.log('Patients State:', patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = patients.filter(
      (patient) =>
        patient.firstname.toLowerCase().includes(searchTermLowerCase) ||
        patient.DOB.includes(searchTerm)
    );
    setFilteredPatients(filtered);
  };

  const handleSearchByFirstname = () => {
    setSearchByFirstname(true);
    setFilteredPatients([]); // Clear previous search results
  };

  const handleGoBack = () => {
    navigate.goBack(); // Use the goBack method from useHistory
  };

  return (
    <div className="manage-patients-page">
      <h2 align="center">Manage Patients...</h2>

      <div className="search-container">
        {searchByFirstname ? (
          <>
            <span>Firstname:</span>
            <input
              type="text"
              placeholder="Enter Firstname"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </>
        ) : (
          <button onClick={handleSearchByFirstname}>Search by Firstname</button>
        )}
        <input
          type="text"
          placeholder="Search by Firstname or DOB"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <li key={patient._id} className="patient-item">
              <h3>{`${patient.firstname} ${patient.lastname}`}</h3>
              <p>Email: {patient.email}</p>
              <p>Phone Number: {patient.Phonenumber}</p>
              <p>Gender: {patient.Gender}</p>
              <p>Date of Birth: {patient.DOB}</p>
              <p>Age: {patient.Age}</p>
              <p>Address: {patient.Address}</p>
              {/* Display additional patient information or actions as needed */}
            </li>
          ))
        ) : (
          <p>{searchByFirstname ? 'Enter Firstname and click Search.' : 'No matching patients.'}</p>
        )}
      </ul>

      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default ManagePatients;
