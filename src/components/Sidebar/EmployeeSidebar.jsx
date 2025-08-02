// src/components/Sidebar/EmployeeSidebar.jsx
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ConstructionIcon from '@mui/icons-material/Construction';
import Logo from '../../assets/Logo.png';

export default function EmployeeSidebar() {
  const sidebarStyles = {
    width: '240px',
    height: '100vh',
    background: '#f5f5f5',
    paddingTop: '1rem',
    position: 'fixed',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
  };

  const logoStyles = {
    textAlign: 'center',
    margin: '1rem 0'
  };

  const logoImgStyles = {
    width: '100px',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '-50px',
    marginBottom: '-40px',
    objectFit: 'contain',
  };

  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    margin: '8px 12px',
    textDecoration: 'none',
    color: '#333',
    border: '2px solid #007FFF',
    borderRadius: '8px',
    transition: '0.3s ease',
    fontWeight: 500,
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  };

  const activeLinkStyles = {
    backgroundColor: '#007FFF',
    color: 'white',
    borderColor: '#005fcc'
  };

  const iconStyles = {
    marginRight: '8px'
  };

  return (
    <div style={sidebarStyles}>
      <div style={logoStyles}>
        <img src={Logo} alt="Logo" style={logoImgStyles} />
      </div>
      <nav>
        <NavLink
          to="/"
          end
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <DashboardIcon style={iconStyles} />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <PersonIcon style={iconStyles} />
          Profile
        </NavLink>

        <NavLink
          to="/attendance"
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <CalendarMonthIcon style={iconStyles} />
          Attendance
        </NavLink>

        <NavLink
          to="/performance"
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <BarChartIcon style={iconStyles} />
          Performance
        </NavLink>

        <NavLink
          to="/task"
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <AssignmentIcon style={iconStyles} />
          Task
        </NavLink>

        <NavLink
          to="/equipment"
          style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeLinkStyles } : navLinkStyles}
        >
          <ConstructionIcon style={iconStyles} />
          Equipment Identify
        </NavLink>
      </nav>
    </div>
  );
}
