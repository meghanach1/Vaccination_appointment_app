// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ForgotPassword from './components/ForgotPassword';
import ScheduleAppointment from './components/ScheduleAppointment';
import ManagePatient from './components/ManagePatient';
import PatientProfile from './components/PatientProfile';
import PatientRecords from './components/PatientRecords';
import SelectVaccines from './components/SelectVaccines';
import SelectDateTime from './components/SelectDateTime';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
        <Route path="/select-vaccines" element={<SelectVaccines />} />        
        <Route path="/manage-patient" element={<ManagePatient />}>
        <Route path="profile" element={<PatientProfile />} />
        <Route path="records" element={<PatientRecords />} />
        </Route>
        <Route path="/selectdatetime" element={<SelectDateTime />} />
      </Routes>
    </Router>
  );
};

export default App;
