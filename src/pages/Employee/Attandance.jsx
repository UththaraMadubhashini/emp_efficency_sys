import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = new Date();
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const handleDateChange = (date) => {
    if (!isSameDay(date, today)) {
      toast.warning("You can only mark attendance for today!");
      return;
    }

    setSelectedDate(date);
    const dateStr = date.toDateString();

    const exists = attendanceData.find((d) => d.date === dateStr);
    if (!exists) {
      const newEntry = {
        date: dateStr,
        checkIn: new Date().toLocaleTimeString(),
        checkOut: "--:--:--",
        status: "Present",
      };
      setAttendanceData((prev) => [...prev, newEntry]);
      toast.success("Check-In recorded!");
    } else {
      toast.info("You have already marked attendance today.");
    }
  };

  const handleCheckOut = () => {
    const dateStr = selectedDate.toDateString();
    const updated = attendanceData.map((entry) =>
      entry.date === dateStr
        ? { ...entry, checkOut: new Date().toLocaleTimeString() }
        : entry
    );

    setAttendanceData(updated);
    toast.success("Checked out successfully!");
  };

  const handleLeaveRequest = () => {
    const dateStr = selectedDate.toDateString();
    const alreadyMarked = attendanceData.find(
      (entry) => entry.date === dateStr
    );

    if (!alreadyMarked) {
      setAttendanceData((prev) => [
        ...prev,
        {
          date: dateStr,
          checkIn: "--:--:--",
          checkOut: "--:--:--",
          status: "Leave",
        },
      ]);
      toast.success("Leave requested!");
    } else {
      toast.info("Leave already marked or attendance already exists.");
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const entry = attendanceData.find((d) => d.date === date.toDateString());
      if (entry) {
        return (
          <div
            style={{
              marginTop: 2,
              fontSize: 10,
              color: entry.status === "Present" ? "green" : "red",
              textAlign: "center",
            }}
          >
            {entry.status}
          </div>
        );
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    return view === "month" && !isSameDay(date, today);
  };

  return (
    <Box p={isMobile ? 2 : 4} minHeight="100vh">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              border: "3px solid #67BCE0",
              borderRadius: "10px",
            }}
          >
            <Calendar
              onClickDay={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              tileDisabled={tileDisabled}
              calendarType="gregory"
            />
          </Card>

          <Box mt={2} display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#67BCE0",
              ":hover": { bgcolor: "#ffffff" },
              borderRadius: "60px",
              border: "3px solid #000000",
              color: "#000000",
              textTransform: "none",
              boxShadow: 2,
              width: { xs: "100%", sm: "auto" },
                flex: 1,
              }}
              onClick={() => navigate("/leave")}
            >
              Leave Request
            </Button>

            <Button
              variant="outlined"
              sx={{
                bgcolor: "#67BCE0",
              ":hover": { bgcolor: "#ffffff" },
              borderRadius: "60px",
              border: "3px solid #000000",
              color: "#000000",
              textTransform: "none",
              boxShadow: 2,
              width: { xs: "100%", sm: "auto" },
              flex: 1,
              }}
              onClick={handleCheckOut}
            >
              Check-Out
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#cfe2f3" }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-In Time</TableCell>
                  <TableCell>Check-Out Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.checkIn}</TableCell>
                    <TableCell>{row.checkOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#67BCE0",
              ":hover": { bgcolor: "#ffffff" },
              borderRadius: "60px",
              border: "3px solid #000000",
              color: "#000000",
              textTransform: "none",
              boxShadow: 2,
              width: { xs: "100%", sm: "auto" },
              marginTop: '20px'
                  }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
