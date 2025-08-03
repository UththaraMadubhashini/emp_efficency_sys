// src/components/Sidebar/EmployeeSidebar.jsx
import { useState } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ConstructionIcon from '@mui/icons-material/Construction';
import Logo from '../../assets/Logo.png';

export default function EmployeeSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const SIDEBAR_WIDTH = 250;

  const sidebarContent = (
    <div
      style={{
        width: `${SIDEBAR_WIDTH}px`,
        height: '150vh',
        background: '#6766c5',
        fontFamily: '"Segoe UI", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        marginTop: '-7px',
        marginLeft: '-7px',

      }}
    >
      <div style={{
        textAlign: 'center',
        padding: '20px 10px 20px',
        flexShrink: 0
      }}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: '100px',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'contain',
            marginTop: '-10px',
            marginBottom: '-10px'
          }}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          paddingBottom: '1rem'
        }}
      >
        <nav>
          {[
            { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
            { to: '/profile', label: 'Profile', icon: <PersonIcon /> },
            { to: '/attendance', label: 'Attendance', icon: <CalendarMonthIcon /> },
            { to: '/performance', label: 'Performance', icon: <BarChartIcon /> },
            { to: '/task', label: 'Task', icon: <AssignmentIcon /> },
            { to: '/equipment', label: 'Equipment Identify', icon: <ConstructionIcon /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '10px 14px',
                margin: '8px 10px',
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#000000',
                fontWeight: 600,
                fontSize: '14px',
                backgroundColor: isActive ? '#0D07C0' : '#67BCE0',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: isActive ? '#000000' : 'white',
                transition: '0.3s ease',
              })}
            >
              <Box sx={{ minWidth: '24px',      // reserve consistent space for icon
      display: 'flex',
      justifyContent: 'center',
      marginRight: '10px',
      fontSize: '20px',
      lineHeight: 1, }}>
                
                {icon}</Box>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1300,
            bgcolor: '#ffffff',
            border: '1px solid #ccc'
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return (
    <div style={{
      width: `${SIDEBAR_WIDTH}px`,
      height: '100vh',
      position: 'fixed',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      zIndex: 1200
    }}>
      {sidebarContent}
    </div>
  );
}
