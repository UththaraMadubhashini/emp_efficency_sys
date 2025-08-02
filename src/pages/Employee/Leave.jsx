// src/pages/Employee/Leave.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Leave() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    designation: "",
    startDate: "",
    endDate: "",
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
  if (
    !formData.employeeId ||
    !formData.leaveType ||
    !formData.designation ||
    !formData.startDate ||
    !formData.endDate
  ) {
    alert("Please fill out all required fields.");
    return;
  }

  const newLeave = {
    ...formData,
    date:
      formData.startDate === formData.endDate
        ? formData.startDate
        : `${formData.startDate} to ${formData.endDate}`,
    status: "Pending",
  };

  setLeaveList((prev) => [...prev, newLeave]);

  setOpenDialog(false);
  setFormData({
    employeeId: "",
    leaveType: "",
    designation: "",
    startDate: "",
    endDate: "",
  });
};



  const handleStatusChange = (index, newStatus) => {
  const updatedList = [...leaveList];
  updatedList[index].status = newStatus;
  setLeaveList(updatedList);
  toast.success(`Leave ${newStatus}`);
};


  return (
    <Box p={4}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h6">Employee - Employee Name</Typography>
        <Box>
          <span style={{ fontSize: "1.5rem", marginRight: 10 }}>🔔</span>
          <span style={{ fontSize: "1.5rem" }}>👤</span>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Calendar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Calendar onClickDay={handleDateClick} value={selectedDate} />
          </Card>
        </Grid>

        {/* Table */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            All Leaves
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ background: "#B39DDB" }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveList.map((leave, idx) => (
                  <TableRow key={idx}>
          <TableCell>{leave.date}</TableCell>
          <TableCell>{leave.leaveType}</TableCell>
          <TableCell>
            {userRole === "HR" ? (
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => handleStatusChange(idx, "Accepted")}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleStatusChange(idx, "Rejected")}
                >
                  Reject
                </Button>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color:
                    leave.status === "Accepted"
                      ? "green"
                      : leave.status === "Rejected"
                      ? "red"
                      : "orange",
                }}
              >
                {leave.status || "Pending"}
              </Typography>
            )}
          </TableCell>
        </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button variant="contained" color="primary">
              OK
            </Button>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Leave Request Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Leave Request</DialogTitle>
        <DialogContent>
          <Box p={2} bgcolor="#e3f2fd" borderRadius={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Leave Type</InputLabel>
                  <Select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Sick Off">Sick Off</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Half Day">Half Day</MenuItem>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="startDate"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="endDate"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
