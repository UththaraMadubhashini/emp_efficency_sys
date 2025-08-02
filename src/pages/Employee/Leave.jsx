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
  Divider,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

export default function Leave() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [leaveList, setLeaveList] = useState([
    {
      employeeId: "EMP001",
      leaveType: "Sick Off",
      designation: "Software Engineer",
      startDate: "2025-08-02",
      endDate: "2025-08-02",
      date: "2025-08-02",
      status: "Pending",
    },
  ]);

  // "employee" or "HR"
  const userRole = "HR"; // change to "employee" to test role-based UI

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { employeeId, leaveType, designation, startDate, endDate } = formData;
    if (!employeeId || !leaveType || !designation || !startDate || !endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const newLeave = {
      ...formData,
      date: startDate === endDate ? startDate : `${startDate} to ${endDate}`,
      status: "Pending",
    };

    setLeaveList((prev) => [...prev, newLeave]);
    setOpenDialog(false);
    toast.success("Leave request submitted");

    // Reset form
    setFormData({
      employeeId: "",
      leaveType: "",
      designation: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...leaveList];
    updated[index].status = newStatus;
    setLeaveList(updated);
    toast.success(`Leave ${newStatus}`);
  };

  return (
    <Box p={4} display="flex" justifyContent="center">
        <Box maxWidth="1200px" width="100%">
      <Grid container spacing={4} justifyContent="center">
        {/* Calendar Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Calendar onClickDay={handleDateClick} value={selectedDate} />
          </Card>
        </Grid>

        {/* Leave Table Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            All Leaves
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ background: "#B39DDB", justifyContent: "center", }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveList.map((leave, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{leave.date}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>
                        {leave.status === "Pending" && userRole === "HR" ? (
                            <Box display="flex" gap={1}>
                            <Button
                                size="small"
                                color="success"
                                variant="outlined"
                                onClick={() => handleStatusChange(idx, "Accepted")}
                            >
                                Accept
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                variant="outlined"
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
                            {leave.status}
                            </Typography>
                        )}
                        </TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Leave Request Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle
            sx={{
            bgcolor: "#512da8",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
            py: 2,
            }}
        >
            Leave Request Form
        </DialogTitle>
        
        <DialogContent sx={{ bgcolor: "#fefefe", p: 3 }}>
            <br/>
  <Box
    sx={{
      borderRadius: 2,
      boxShadow: 3,
      p: 3,
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
    }}
  >
    {/* Section 1: Employee Information */}
    <Typography variant="subtitle2" color="primary" gutterBottom>
      Employee Information
    </Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleInputChange}
          variant="outlined"
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          variant="outlined"
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
      </Grid>
    </Grid>

    {/* Section 2: Leave Details */}
    <Typography variant="subtitle2" color="primary" sx={{ mt: 4 }} gutterBottom>
      Leave Details
    </Typography>
    <Divider sx={{ mb: 2 }} />

        <Grid item xs={12}>
        <Box sx={{ maxWidth: 200, maxHeight: 100 }}> 
        <FormControl
        fullWidth
        required
        size="small"
        sx={{ bgcolor: "#f5f5f5" }}
        >
        <InputLabel id="leaveType-label">Leave Type</InputLabel>
        <Select
            id="leaveType"
            labelId="leaveType-label"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleInputChange}
            label="Leave Type"
        >
            <MenuItem value="Sick Off">Sick Off</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Half Day">Half Day</MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
        </Select>
        </FormControl>
    </Box>
    </Grid>

    {/* Section 3: Date Range */}
    <Typography variant="subtitle2" color="primary" sx={{ mt: 4 }} gutterBottom>
      Leave Duration
    </Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          name="startDate"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleInputChange}
          sx={{ bgcolor: "#f5f5f5" }}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="End Date"
          type="date"
          name="endDate"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleInputChange}
          sx={{ bgcolor: "#f5f5f5" }}
          required
        />
      </Grid>
    </Grid>
  </Box>
</DialogContent>


        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
                bgcolor: "#512da8",
                ":hover": { bgcolor: "#311b92" },
                textTransform: "none",
                boxShadow: 2,
            }}
            >
            Submit
            </Button>
            <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            sx={{ textTransform: "none" }}
            >
            Cancel
            </Button>
    </DialogActions>
      </Dialog>
    </Box>
</Box>
  );
}
