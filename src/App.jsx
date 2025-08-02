import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import EmployeeLayout from '../src/Layout/EmployeeLayout';

import Dashboard from './pages/Employee/Em_Dashboard';
import Profile from './pages/Employee/Profile';
import Attendance from './pages/Employee/Attandance';
import Leave from './pages/Employee/Leave';
import Performance from './pages/Employee/Perfomance';
import Task from './pages/Employee/Task';
import Equipment from './pages/Employee/Equipment';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Employee routes */}
        <Route path="/" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="performance" element={<Performance />} />
          <Route path="task" element={<Task />} />
          <Route path="equipment" element={<Equipment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
