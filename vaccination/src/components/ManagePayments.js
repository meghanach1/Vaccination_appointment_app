import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/payment/get_payment_details');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const rowsWithId = await Promise.all(
          data.payments.map(async (row) => {
            try {
              const patientResponse = await axios.get(`http://127.0.0.1:5000/patient/${row.patient_id}`);
              const { full_name, email, phone } = patientResponse.data;
              return {
                ...row,
                id: row._id,
                full_name,
                email,
                phone,
                patient_id: row.patient_id,
              };
            } catch (patientError) {
              console.error('Error fetching patient details:', patientError);
              return {
                ...row,
                id: row._id,
                full_name: 'Unknown',
                email: 'Unknown',
                phone: 'Unknown',
              };
            }
          })
        );
        setPayments(rowsWithId);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, []);

  const handleButtonClick = (params) => {
    const { appointment_id, id, patient_id } = params.row;
    navigate(`/payment/${id}`, {
      state: {
        appointment_id,
        id,
        patient_id,
      },
    });
  };
  const handleBackClick = () => {
    // Navigate to /manage-admin
    navigate('/manage-admin');
  };
  const columns = [
    { field: 'full_name', headerName: 'Patient Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'payment_status', headerName: 'Payment Status', width: 150 },
    {
      field: 'proceed_to_pay',
      headerName: 'Proceed to Pay',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          disabled={params.row.payment_status !== 'Pending'}
          onClick={() => handleButtonClick(params)}
        >
          Proceed to Pay
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 align="center">Manage Payments</h1>
     
      <DataGrid rows={payments} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]}  />
      <Button variant="contained" color="primary" onClick={handleBackClick}>
        Back
      </Button>
    </div>
  );
  
};

export default ManagePayments;
