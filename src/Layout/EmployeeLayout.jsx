import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import EmployeeSidebar from '../components/Sidebar/EmployeeSidebar';

function Emp_Header() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Typography variant="h6">Employee - Employee Name</Typography>
      <Box>
        <span style={{ fontSize: "1.5rem", marginRight: 10 }}>🔔</span>
        <span style={{ fontSize: "1.5rem" }}>👤</span>
      </Box>
    </Box>
  );
}

export default function EmployeeLayout() {
  return (
    <div>
      <EmployeeSidebar />
      <div style={{ marginLeft: '240px', padding: '1.5rem' }}>
        <Emp_Header />
        <Outlet />
      </div>
    </div>
  );
}
