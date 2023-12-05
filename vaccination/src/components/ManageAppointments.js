import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getRowId = (row) => row._id;

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/appointment/get_all_appointments');

      const updatedAppointments = await Promise.all(response.data.appointments.map(async (appointment) => {
        const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${appointment.patient_id}`);
        const { full_name, email, age } = patientResponse.data;

        const centerResponse = await axios.get(`http://127.0.0.1:5000/vaccine/${appointment.selected_center_id}`);
        const centerName = centerResponse.data.center_name;

        return { ...appointment, id: appointment._id, patient_name: full_name, patient_email: email, center_name: centerName };
      }));

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const columns = [
    { field: 'patient_name', headerName: 'Patient Name', flex: 1 },
    { field: 'patient_email', headerName: 'Patient Email', flex: 1 },
    { field: 'center_name', headerName: 'Selected Center Name', flex: 1 },
    { field: 'selected_date', headerName: 'Selected Date', flex: 1 },
    { field: 'selected_timeslot', headerName: 'Selected Time Slot', flex: 1 },
    { field: 'selected_vaccines_id', headerName: 'Selected Vaccines(s)', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)} className="edit-button">
            Edit
          </button>
          <button onClick={() => handleDelete(params.row.id)} className="delete-button">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (appointmentId) => {
    const selected = appointments.find((appointment) => appointment.id === appointmentId);
    setSelectedAppointment(selected);
    setEditMode(true);
  };

  const handleDelete = (appointmentId) => {
    console.log('Delete appointment with ID:', appointmentId);
  };

  const handleSaveAppointment = async (editedData) => {
    try {
      await axios.put(`http://127.0.0.1:5000/appointment/update_appointment/${selectedAppointment.id}`, editedData);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id ? { ...appointment, ...editedData } : appointment
        )
      );
      setEditMode(false);
    } catch (error) {
      console.error('Error updating appointment:', error.message);
    }
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
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {editMode && (
        <EditModal
          appointment={selectedAppointment}
          onClose={() => setEditMode(false)}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  );
};

const EditModal = ({ appointment, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(appointment);
  const [vaccines, setVaccines] = useState([]);
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  console.log("editedData",appointment)

  useEffect(() => {
    fetchVaccines();
    fetchDates();
  }, []);

  const fetchVaccines = async () => {
    try {
      const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${appointment?.patient_id}`);
      const { age } = patientResponse.data;
      console.log("age",age)
      console.log("patientResponse",patientResponse)
  
      if (age) {
        const response = await axios.get(`http://127.0.0.1:5000/vaccine/get-vaccines?age=${age}`);
        console.log("response",response)
        setVaccines(response.data.vaccines || []);
      } else {
        console.error('Age is undefined or missing.');
      }
    } catch (error) {
      console.error('Error fetching vaccines:', error.message);
    }
  };

  const fetchDates = () => {
    const today = new Date();
    const datesArray = [];

    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      datesArray.push(date.toISOString().split('T')[0]);
    }

    setDates(datesArray);
  };

  const fetchLocations = async (selectedDate) => {
    try {
      const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${appointment?.patient_id}`);
      const { age } = patientResponse.data;
      const response = await axios.get(`http://127.0.0.1:5000/vaccine/api/get-locations?selectedDate=${encodeURIComponent(selectedDate)}`);
      setLocations(response.data.locations);
    } catch (error) {
      console.error('Error fetching locations:', error.message);
    }
  };

  const fetchTimeSlots = async (locationId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/vaccine/api/get-time-slots?selectedId=${encodeURIComponent(locationId)}`);
      setTimeSlots(response.data.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error.message);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));

    if (field === 'selected_date') {
      fetchLocations(value);
    }

    if (field === 'selected_center_id') {
      fetchTimeSlots(value);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <div className="edit-modal">
      <h2>Edit Appointment</h2>
      <label>
        Selected Vaccines:
        <select
          multiple
          value={editedData.selected_vaccines_id}
          onChange={(e) => {
            const vaccines = Array.from(e.target.selectedOptions, (option) => option.value);
            handleFieldChange('selected_vaccines_id', vaccines);
          }}
        >
          {vaccines.map((vaccine) => (
            <option key={vaccine._id} value={vaccine._id}>
              {vaccine.vaccine_name}
            </option>
          ))}
        </select>
      </label>
    

      

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ManageAppointments;
