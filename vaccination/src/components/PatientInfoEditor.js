// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// CSS styles
import './css/PatientInfoEditor.css'; // Make sure to create and import the CSS file

const PatientInfoEditor = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { patientId } = useParams();
  const location = useLocation();
  const { selected } = location.state || {};
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]); 
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate(); 
  const [patientInfo, setPatientInfo] = useState({
    full_name: '',
    email: '',
    age: 0,
    Center_Name: '',
    Selected_Date: '',
    Selected_Time_Slot: '',
    Selected_Vaccines: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('selected:', selected.data);
        const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${selected.patient_id}`);
        const centerResponse = await axios.get(`http://127.0.0.1:5000/vaccine/${selected.selected_center_id}`);
        console.log('patientResponse:', patientResponse.data);
        console.log('centerResponse:', centerResponse.data);
        console.log('select', selected._id);
        setPatientInfo({
          full_name: patientResponse.data.full_name,
          email: patientResponse.data.email,
          age: patientResponse.data.age,
          Center_Name: centerResponse.data.center_name,
          Selected_Date: centerResponse.data.availableDates,
          Selected_Time_Slot: centerResponse.data.availableTimeSlots,
          Selected_Vaccines: selected.selected_vaccines_id,
        });
      } catch (error) {
        console.error('Error fetching patient information:', error.message);
      }
    };

    fetchData();
  }, [patientId]);

  const handleFieldChange = (field, value) => {
    setPatientInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleBack = () => {
    // Assuming you are using React Router for navigation
    // You may need to replace the following line with the appropriate navigation logic
    // e.g., history.push('/previous-page')
    navigate(-1);
  };

  const handleSaveAppointment = async () => {
    console.log('Saving appointment:', selectedAppointment, 'with data:', patientInfo);
    try {
      await axios.put(`http://127.0.0.1:5000/appointment/update_appointment/${selected._id}`, patientInfo);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id ? { ...appointment, ...patientInfo } : appointment
        )
      );
     
      setEditMode(false);
    } catch (error) {
      console.error('Error updating appointment:', error.message);
    }
  };

  return (
    <div className="patient-info-editor">
      <h2>Edit Patient Information</h2>
      {updateSuccess && <p className="success-message">Update successful!</p>}
      <div className="input-container">
        <label>Full Name:</label>
        <input
          type="text"
          value={patientInfo.full_name}
          onChange={(e) => handleFieldChange('full_name', e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Email:</label>
        <input
          type="text"
          value={patientInfo.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Age:</label>
        <input
          type="number"
          value={patientInfo.age}
          onChange={(e) => handleFieldChange('age', e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Center Name:</label>
        <input
          type="text"
          value={patientInfo.Center_Name}
          onChange={(e) => handleFieldChange('Center_Name', e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="input-container">
        <label>Selected Date:</label>
        {Array.isArray(patientInfo.Selected_Date) ? (
          <select
            value={patientInfo.Selected_Date}
            onChange={(e) => handleFieldChange('Selected_Date', e.target.value)}
            disabled={!editMode}
          >
            {patientInfo.Selected_Date.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={patientInfo.Selected_Date}
            onChange={(e) => handleFieldChange('Selected_Date', e.target.value)}
            disabled={!editMode}
          />
        )}
      </div>

      <div className="input-container">
        <label>Selected Time Slot:</label>
        {Array.isArray(patientInfo.Selected_Time_Slot) ? (
          <select
            value={patientInfo.Selected_Time_Slot}
            onChange={(e) => handleFieldChange('Selected_Time_Slot', e.target.value)}
            disabled={!editMode}
          >
            {patientInfo.Selected_Time_Slot.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={patientInfo.Selected_Time_Slot}
            onChange={(e) => handleFieldChange('Selected_Time_Slot', e.target.value)}
            disabled={!editMode}
          />
        )}
      </div>

      <div className="input-container">
        <label>Selected Vaccines:</label>
        {Array.isArray(patientInfo.Selected_Vaccines) ? (
          <select
            value={patientInfo.Selected_Vaccines}
            onChange={(e) => handleFieldChange('Selected_Vaccines', e.target.value)}
            disabled={!editMode}
          >
            {patientInfo.Selected_Vaccines.map((vaccine, index) => (
              <option key={index} value={vaccine}>
                {vaccine}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={patientInfo.Selected_Vaccines}
            onChange={(e) => handleFieldChange('Selected_Vaccines', e.target.value)}
            disabled={!editMode}
          />
        )}
      </div>
      {!editMode && <button onClick={handleEdit}>Edit</button>}
      {editMode && <button onClick={handleSaveAppointment}>Save</button>}
      {updateSuccess && <button onClick={handleBack}>Back</button>}
    </div>
  );
};

export default PatientInfoEditor;
