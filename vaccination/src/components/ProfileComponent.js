// src/components/ProfileComponent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/ProfileComponent.module.css';

const ProfileComponent = () => {
  const { patient_id } = useParams();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/patient/get_patient/${patient_id}`);
        const data = await response.json();

        if (data && data.status === 'success' && data.patient) {
          setPatientData(data.patient);
          console.log('Patient Data:', data.patient);
        } else {
          console.error('Invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patient_id]);

  return (
    <div className="container">
      <h1>Profile Component</h1>
      {patientData ? (
        <>
          <p className="p-even">Patient ID: {patient_id}</p>
          <p className="p-odd">FirstName: {patientData.firstname}</p>
          <p className="p-even">LastName: {patientData.lastname}</p>
          <p className="p-odd">Age: {patientData.age}</p>
          <p className="p-even">DOB: {patientData.DOB}</p>
          <p className="p-odd">Gender: {patientData.Gender}</p>
          <p className="p-even">Phone Number: {patientData.PhoneNumber}</p>
          <p className="p-odd">Address: {patientData.Address}</p>
          <p className="p-even">Email: {patientData.email}</p>
        </>
      ) : (
        <p className="loading-message">Loading patient information...</p>
      )}
    </div>
  );
};

export default ProfileComponent;
