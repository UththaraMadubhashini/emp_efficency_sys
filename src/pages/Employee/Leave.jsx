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

  const userRole = "HR";

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
            <Card sx={{ p: 2, border: "3px solid #67BCE0", borderRadius: "12px" }}>
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
                <TableHead sx={{ background: "#cfe2f3" }}>
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
              color: "#67BCE0",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.25rem",
              py: 2,
            }}
          >
            Leave Request Form
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            <Box
              sx={{
                boxShadow: 3,
                p: 3,
                backgroundColor: "#ffffff",
                border: "5px solid #67BCE0",
                borderRadius: "20px",
              }}
            >
              {/* Section 1: Employee Info */}
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Employee Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <Box component="span">
                        Employee ID
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Box>
                    }
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fff" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <Box component="span">
                        Designation
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Box>
                    }
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fff" }}
                  />
                </Grid>
              </Grid>

              {/* Section 2: Leave Details */}
              <Typography variant="subtitle2" color="primary" sx={{ mt: 4 }} gutterBottom>
                Leave Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid item xs={12}>
                <FormControl fullWidth sx={{ bgcolor: "#fff" }}>
                  <InputLabel id="leaveType-label">
                      Leave Type <Box component="span" sx={{ color: "red", display: "inline" }}>*</Box>
                    </InputLabel>
                    <Select
                      id="leaveType"
                      labelId="leaveType-label"
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleInputChange}
                      label="Leave Type"
                    >
                    <MenuItem value="Sick Off">Sick Off</MenuItem>
                    <MenuItem value="Half Day">Half Day</MenuItem>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                  </Select>
                </FormControl>
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
                    label={
                      <Box component="span">
                        Start Date
                        <Box component="span" sx={{ color: "red", display: "inline" }}>
                          *
                        </Box>
                      </Box>
                    }
                    type="date"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label={
                        <Box component="span">
                          Start Date
                          <Box component="span" sx={{ color: "red", display: "inline" }}>
                            *
                          </Box>
                        </Box>
                      }
                      type="date"
                      name="startDate"
                      InputLabelProps={{ shrink: true }}
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
      width: "100%",
      justifyContent: "flex-end",
    }}
  >
    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={{
        bgcolor: "#67BCE0",
        ":hover": { bgcolor: "#ffffff" },
        borderRadius: "60px",
        border: "3px solid #000000",
        color: "#000000",
        textTransform: "none",
        boxShadow: 2,
        width: { xs: "100%", sm: "auto" },
      }}
    >
      Submit
    </Button>

    <Button
      variant="outlined"
      onClick={() => setOpenDialog(false)}
      sx={{
        bgcolor: "#67BCE0",
        ":hover": { bgcolor: "#ffffff" },
        borderRadius: "60px",
        border: "3px solid #000000",
        color: "#000000",
        textTransform: "none",
        boxShadow: 2,
        width: { xs: "100%", sm: "auto" },
      }}
    >
      Cancel
    </Button>
  </Box>
</DialogActions>

        </Dialog>
      </Box>
    </Box>
  );
}
