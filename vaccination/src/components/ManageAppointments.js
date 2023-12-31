import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import PatientInfoEditor from './PatientInfoEditor';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ManageAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/appointment/get_all_appointments');

      const updatedAppointments = await Promise.all(response.data.appointments.map(async (appointment) => {
        const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${appointment.patient_id}`);
        const { full_name, email } = patientResponse.data;

        const centerResponse = await axios.get(`http://127.0.0.1:5000/vaccine/${appointment.selected_center_id}`);
        const centerName = centerResponse.data.center_name;

        return { ...appointment, id: appointment._id, patient_name: full_name, patient_email: email, center_name: centerName };
      }));

      setAppointments(updatedAppointments);
      console.log("updatedAppointments",updatedAppointments)
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const columns = [
    { field: 'patient_name', headerName: 'Patient Name', flex: 1 },
    { field: 'patient_email', headerName: 'Patient Email', flex: 1 },
    { field: 'selected_vaccines_id', headerName: 'Selected Vaccines(s)', flex: 1 },
    { field: 'selected_date', headerName: 'Selected Date', flex: 1 },
    { field: 'center_name', headerName: 'Selected Center Name', flex: 1 },
    { field: 'selected_timeslot', headerName: 'Selected Time Slot', flex: 1 },
    
   /*  {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)} className="edit-button">
            Edit
          </button>
        </div>
      ),
    }, */
  ];

  const handleEdit = async (appointmentId) => {
    const selected = appointments.find((appointment) => appointment._id === appointmentId);

    setSelectedAppointment(selected);
    setEditingPatient(selected.patient_id);
    setEditMode(true);

    // Navigate to /patient-info-editor/:appointmentId
    navigate(`/patient-info-editor/${selected._id}`,{
      state: { selected  },
    });

    
    
    
  };
  const handleSavePatientInfo = async (editedPatientInfo) => {
    try {
      await axios.put(`http://127.0.0.1:5000/patient/update_patient/${editingPatient}`, editedPatientInfo);

      // Fetch appointments again to update patient information in the appointment table
      await fetchAppointments();
      setEditingPatient(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating patient information:', error.message);
    }
  };

  const handleBackClick = () => {
    // Navigate to /manage-admin
    navigate('/manage-admin');
  };

  return (
    <div>
      <h1 align="center">Manage Appointments</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={appointments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          
        />
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Back
        </Button>
      </div>
      {editMode && editingPatient && (
        <PatientInfoEditor
          patientId={editingPatient}
          appointmentId={selectedAppointment.id}
          onSave={handleSavePatientInfo}
          onCancel={() => setEditingPatient(null)}
        />
      )}
    </div>
  );
};

export default ManageAppointments;
