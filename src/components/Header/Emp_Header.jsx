import { Box, Typography } from "@mui/material";

// Header Component
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
