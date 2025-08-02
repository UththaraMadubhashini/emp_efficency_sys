// src/components/Sidebar/EmployeeSidebar.jsx
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function EmployeeSidebar() {
  return (
    <div className="sidebar">
      <div className="logo">EMPLOYEE</div>
      <nav className="nav-links">
        <NavLink to="/" end className="nav-link">
          <DashboardIcon className="icon" />
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          <PersonIcon className="icon" />
          Profile
        </NavLink>
        <NavLink to="/attendance" className="nav-link">
          <CalendarMonthIcon className="icon" />
          Attendance
        </NavLink>
        <NavLink to="/performance" className="nav-link">
          <BarChartIcon className="icon" />
          Performance
        </NavLink>
        <NavLink to="/task" className="nav-link">
          <AssignmentIcon className="icon" />
          Task
        </NavLink>
        <NavLink to="/equipment" className="nav-link">
          <ConstructionIcon className="icon" />
          Equipment Identify
        </NavLink>
      </nav>
    </div>
  );
}
