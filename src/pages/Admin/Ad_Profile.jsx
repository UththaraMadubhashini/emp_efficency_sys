import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Mock employee data
const employees = [
  { empId: "E001", name: "Inali Shashika", dept: "HR" },
  { empId: "E002", name: "Nimal Perera", dept: "IT" },
  { empId: "E003", name: "Samanthi Jayasuriya", dept: "Finance" },
  { empId: "E004", name: "Kavindu Rathnayake", dept: "IT" },
  { empId: "E005", name: "Tharushi Madushani", dept: "Marketing" },
  { empId: "E006", name: "Amal Silva", dept: "HR" },
];

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    alert(`Update clicked for ID: ${id}`);
    // navigate(`/admin/profile-form?id=${id}`); // optional: navigate to update mode
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(`Are you sure to delete employee ID: ${id}?`);
    if (confirm) {
      alert(`Deleted ID: ${id}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}
      <Typography variant="h6" gutterBottom>
        All Employees
      </Typography>

      {/* Filter Dropdowns & Add Button */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} sm={3}>
          <Select fullWidth defaultValue="" displayEmpty>
            <MenuItem value="">Department</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select fullWidth defaultValue="" displayEmpty>
            <MenuItem value="">Emp_ID</MenuItem>
            {employees.map((emp) => (
              <MenuItem key={emp.empId} value={emp.empId}>
                {emp.empId}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/admin/profile-form")} // ✅ navigation
              sx={{
                bgcolor: "#74C0E3",
                ":hover": { bgcolor: "#ffffff" },
                border: "2px solid #000000",
                borderRadius: "25px",
                color: "#000",
                px: 3,
                textTransform: "none",
              }}
            >
              Add New Employee
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#A1A3DC" }}>
            <TableRow>
              <TableCell />
              <TableCell>Employee_ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.empId}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{emp.empId}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.dept}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdate(emp.empId)}
                    sx={{ mr: 1 }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(emp.empId)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom OK Button */}
      <Box mt={6} textAlign="right">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#74C0E3",
            ":hover": { bgcolor: "#ffffff" },
            borderRadius: "30px",
            border: "2px solid #000000",
            px: 5,
            py: 1.5,
            color: "#000000",
            textTransform: "none",
          }}
        >
          OK
        </Button>
      </Box>
    </Box>
  );
}
