import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from '../src/Layout/AdminLayout';
import EmployeeLayout from '../src/Layout/EmployeeLayout';

// Admin Components and Pages
import AdminSidebar from './components/Sidebar/AdminSidebar';
import AdminDashboard from './pages/Admin/Ad_Dashboard';
import ProfileManagement from './pages/Admin/Ad_Profile';
import AttendanceManagement from './pages/Admin/Ad_Attandance';
import PerformanceManagement from './pages/Admin/Ad_Perfomance';
import TaskManagement from './pages/Admin/Ad_Task';

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
        {/*  Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile-management" element={<ProfileManagement />} />
          <Route path="attendance-management" element={<AttendanceManagement />} />
          <Route path="performance-management" element={<PerformanceManagement />} />
          <Route path="task-management" element={<TaskManagement />} />
        </Route>


        {/* Employee routes */}
        <Route path="/employee" element={<EmployeeLayout />}>
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
