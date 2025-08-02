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
    background: '#6766c5',
    paddingTop: '1rem',
    position: 'fixed',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    fontFamily: '"Segoe UI", sans-serif'
  };

  const logoStyles = {
    textAlign: 'center',
    margin: '20px 0 20px 0',
    padding: '0 10px'
  };

  const logoImgStyles = {
    width: '120px',
    height: 'auto',
    borderRadius: '12px',
    objectFit: 'contain',
    marginTop: '-30px',
    marginBottom: '-10px'
  };

  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 18px',
    margin: '10px 14px',
    textDecoration: 'none',
    color: '#000000',
    fontWeight: 600,
    fontSize: '15px',
    backgroundColor: '#67BCE0',
    borderRadius: '8px',
    border: '3px solid white',
    transition: '0.3s ease',
  };

  const activeLinkStyles = {
    backgroundColor: '#0D07C0',
    color: '#ffffff',
    borderColor: '#000000',
  };

  const iconStyles = {
    marginRight: '10px',
    fontSize: '20px'
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
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <DashboardIcon style={iconStyles} />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <PersonIcon style={iconStyles} />
          Profile
        </NavLink>

        <NavLink
          to="/attendance"
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <CalendarMonthIcon style={iconStyles} />
          Attendance
        </NavLink>

        <NavLink
          to="/performance"
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <BarChartIcon style={iconStyles} />
          Performance
        </NavLink>

        <NavLink
          to="/task"
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <AssignmentIcon style={iconStyles} />
          Task
        </NavLink>

        <NavLink
          to="/equipment"
          style={({ isActive }) =>
            isActive
              ? { ...navLinkStyles, ...activeLinkStyles }
              : navLinkStyles
          }
        >
          <ConstructionIcon style={iconStyles} />
          Equipment Identify
        </NavLink>
      </nav>
    </div>
  );
}
