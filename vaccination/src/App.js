// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ManageAdmin from './components/ManageAdmin';
import ManageAppointments from './components/ManageAppointments';
import ManageStaff from './components/ManageStaff';
import ManagePayments from './components/ManagePayments';
import RegistrationPage from './components/RegistrationPage';
import ForgotPassword from './components/ForgotPassword';
import ScheduleAppointment from './components/ScheduleAppointment';
import ManagePatient from './components/ManagePatient';
import PatientProfile from './components/PatientProfile';
import PatientRecords from './components/PatientRecords';
import SelectVaccines from './components/SelectVaccines';
import SelectDateTime from './components/SelectDateTime';
import MedicalHistory from './components/MedicalHistory';
import Payment from './components/Payment';
import Appointment from './components/Appointment';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login routes */}
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* Admin routes */}
        <Route path="/manage-admin" element={<ManageAdmin />} />

        {/* Appointments routes */}
        <Route path="/manage-appointments" element={<ManageAppointments />} />

        {/* Staff routes */}
        <Route path="/manage-staff" element={<ManageStaff />} />

        {/* Payments routes */}
        <Route path="/manage-payments" element={<ManagePayments />} />

        {/* Registration route */}
        <Route path="/registration" element={<RegistrationPage />} />

        {/* Forgot password route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Schedule appointment route */}
        <Route path="/schedule-appointment" element={<ScheduleAppointment />} />

        {/* Patient routes */}
        <Route path="/manage-patient" element={<ManagePatient />}>
          {/* Patient profile route */}
          <Route path="profile" element={<PatientProfile />} />
          
          {/* Patient records route */}
          <Route path="records" element={<PatientRecords />} />
        </Route>

        {/* Select vaccines route */}
        <Route path="/select-vaccines" element={<SelectVaccines />} />

        {/* Select date and time route */}
        <Route path="/selectdatetime" element={<SelectDateTime />} />
        <Route path="/medical-history" element={<MedicalHistory />} />

        {/* Select payment route */}
        <Route path="/payment" element={<Payment />} />

        {/* Select appointment route */}
        <Route path="/appointment" element={<Appointment />} />
        
        
        
      </Routes>
    </Router>
  );
};

export default App;
