import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
} from '@mui/material';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#67BCE088',
  border: '5px solid #67BCE088',
  color: '#000',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

export default function Performance() {
  const leaveCount = 8;
  const attendance = 25;
  const employeeRating = 4.5;

  const taskCompletionData = [
    { name: 'Complete Tasks', value: 75 },
    { name: 'Uncomplete Tasks', value: 25 },
  ];

  const pieColors = ['#4544B4CC', '#67BCE0'];

  const barChartData = [
    { name: 'Present', value: 23 },
    { name: 'Absent', value: 15 },
    { name: 'Leaves', value: 7 },
  ];

  const barColors = ['#7675E3', '#67BCE0', '#4544B4'];

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="flex-start">
      {/* Employee Ratings - left tall box */}
      <Grid item xs={12} md={4}>
        <StyledBox sx={{ height: '100%' }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Employee Ratings
          </Typography>
          <Typography variant="h5">{employeeRating}</Typography>
          <Typography fontSize={24}>⭐⭐⭐⭐☆</Typography>
          <Typography variant="body2" fontWeight="bold" mt={2}>
            Latest HR Comment
          </Typography>
          <Typography variant="body2">
            Great job on completing the task!
          </Typography>
        </StyledBox>
      </Grid>

      {/* Right column with two small boxes stacked vertically */}
      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          {/* Leave Count */}
          <StyledBox
            sx={{
              height: 92,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Leave Count per Month
            </Typography>
            <Typography variant="h5" mt={2}>
              {leaveCount}
            </Typography>
          </StyledBox>

          {/* Attendance Count */}
          <StyledBox
            sx={{
              height: 92,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Attendance per Month
            </Typography>
            <Typography variant="h5" mt={2}>
              {attendance}
            </Typography>
          </StyledBox>
        </Stack>
      </Grid>
    </Grid>


      {/* Charts Row */}
      <Grid container spacing={2} mt={2}>
        {/* Task Completion Chart */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              p: 2,
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Task Completion
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <PieChart width={180} height={180}>
                <Pie
                  data={taskCompletionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                mt: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  width={14}
                  height={14}
                  bgcolor="#4544B4"
                  borderRadius={1}
                />
                <Typography variant="body2">Complete Tasks</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  width={14}
                  height={14}
                  bgcolor="#67BCE0"
                  borderRadius={1}
                />
                <Typography variant="body2">Uncomplete Tasks</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Attendance Bar Chart */}
      <Grid item xs={12}>
        <Box
          sx={{
            width: '200%',
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 2,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            mx: 'auto',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            textAlign="center"
            mb={1}
          >
            Attendance Breakdown
          </Typography>
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Grid>
      </Grid>

      {/* Cancel Button */}
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#67BCE0',
            border: '2px solid black',
            px: 4,
            py: 1,
            borderRadius: '20px',
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
