// src/layouts/EmployeeLayout.jsx
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from '../components/Sidebar/EmployeeSidebar';

export default function EmployeeLayout() {
  return (
    <div>
      <EmployeeSidebar />
      <div style={{ marginLeft: '240px', padding: '1.5rem' }}>
        <Outlet />
      </div>
    </div>
  );
}
