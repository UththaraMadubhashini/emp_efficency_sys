import { Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Emp_Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems={isMobile ? 'flex-start' : 'center'}
      mb={4}
      sx={{
        ml: isMobile ? 1 : 2,
        mr: isMobile ? 1 : 2,
        mt: isMobile ? 2 : 0,
        gap: isMobile ? 1 : 0,
      }}
    >
      <Typography
        variant={isMobile ? 'subtitle1' : 'h6'}
        sx={{ fontWeight: 600 }}
      >
        Employee - Employee Name
      </Typography>

      <Box display="flex" gap={1} alignItems="center">
        <IconButton aria-label="notifications" size="large">
          <NotificationsIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="profile" size="large" component={Link} to="/profile">
          <AccountCircleIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Emp_Header;
