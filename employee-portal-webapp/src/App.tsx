import React from 'react';
import './App.css';
import Admindashboard from './pages/admin/adminDashboard/Admindashboard';
import Login from './pages/admin/login/Login';
import EmployerBulkUpload from './pages/employer/EmployerBulkUpload';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from './pages/LandingPage';
import EmployeeRegistration from './pages/employee/EmployeeRegistration';
import EmployeeLogin from './pages/employee/EmployeeLogin';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/employer" element={<EmployerDashboard/>}/>
        <Route path="/adminLogin" element={<Login/>}/>
        <Route path="/admin" element={<Admindashboard/>}/>
        <Route path="/employeeRegister" element={<EmployeeRegistration/>}/>
        <Route path="/employeeLogin" element={<EmployeeLogin/>}/>
        <Route path="/employee/:id" element={<EmployeeDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
