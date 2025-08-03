// src/Layout/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Sidebar/AdminSidebar';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
