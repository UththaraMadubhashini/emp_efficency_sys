import React, { useEffect, useState } from "react";
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
  Paper,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  TablePagination
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { rtdb } from "../../firebase/firebase";
import { ref, onValue, update } from "firebase/database";

export default function Ad_Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [empIdFilter, setEmpIdFilter] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, employee: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const departments = ["HR", "Food & Beverages", "IT", "FrontDesk", "HouseKeeping"];

  useEffect(() => {
    const employeesRef = ref(rtdb, "employees");
    const unsubscribe = onValue(employeesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const employeesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setEmployees(employeesArray);
      } else {
        setEmployees([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = departmentFilter ? emp.department === departmentFilter : true;
    const matchesId = empIdFilter ? emp.employeeId === empIdFilter : true;
    return matchesDept && matchesId;
  });

  const handleUpdate = (id) => {
    const emp = employees.find((e) => e.id === id);
    setSelectedEmployee(emp);
    setOpenEditDialog(true);
  };

  const handleFieldChange = (e) => {
    setSelectedEmployee({ ...selectedEmployee, [e.target.name]: e.target.value });
  };

  const handleSaveUpdate = async () => {
    try {
      await update(ref(rtdb, `employees/${selectedEmployee.id}`), {
        ...selectedEmployee,
        updatedAt: new Date().toISOString(),
      });
      setSnackbar({ open: true, message: "Employee updated successfully!", severity: "success" });
      setOpenEditDialog(false);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to update employee: " + error.message, severity: "error" });
    }
  };

  const handleDeleteClick = (employee) => setDeleteConfirm({ open: true, employee });
  const handleConfirmDelete = () => {
    const emp = deleteConfirm.employee;
    if (!emp) return;
    setEmployees(employees.filter((e) => e.id !== emp.id));
    setSnackbar({ open: true, message: `Employee ${emp.employeeId} removed from list!`, severity: "success" });
    setDeleteConfirm({ open: false, employee: null });
  };
  const handleCancelDelete = () => setDeleteConfirm({ open: false, employee: null });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        All Employees
      </Typography>

      {/* Filters & Add Button */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} sm={3}>
          <Select fullWidth displayEmpty value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <MenuItem value="">Department</MenuItem>
            {departments.map((dep) => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select fullWidth displayEmpty value={empIdFilter} onChange={(e) => setEmpIdFilter(e.target.value)}>
            <MenuItem value="">Emp_ID</MenuItem>
            {employees.map((emp) => <MenuItem key={emp.id} value={emp.employeeId}>{emp.employeeId}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/admin/profile-form")}
              sx={{ bgcolor: "#74C0E3", ":hover": { bgcolor: "#ffffff" }, border: "2px solid #000", borderRadius: "25px", color: "#000", px: 3, textTransform: "none" }}
            >
              Add New Employee
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ borderCollapse: "collapse" }} aria-label="employee table">
          <TableHead sx={{ backgroundColor: "#A1A3DC" }}>
            <TableRow>
              <TableCell sx={{ border: "1px solid #999" }}>Employee_ID</TableCell>
              <TableCell sx={{ border: "1px solid #999" }}>Employee Name</TableCell>
              <TableCell sx={{ border: "1px solid #999" }}>Department</TableCell>
              <TableCell align="center" sx={{ border: "1px solid #999" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ border: "1px solid #999" }}>{emp.employeeId}</TableCell>
                  <TableCell sx={{ border: "1px solid #999" }}>{emp.fullName}</TableCell>
                  <TableCell sx={{ border: "1px solid #999" }}>{emp.department}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #999" }}>
                    <IconButton color="primary" onClick={() => handleUpdate(emp.id)} sx={{ mr: 1 }}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(emp)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ border: "1px solid #999" }}>No employees found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Edit Employee Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#67BCE0", textAlign: "center", fontWeight: "bold", fontSize: "1.25rem", py: 2 }}>Edit Employee</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedEmployee && (
            <Box sx={{ boxShadow: 3, p: 3, backgroundColor: "#fff", border: "5px solid #67BCE0", borderRadius: "20px" }}>
              <Grid container spacing={2}>
                {["employeeId","fullName","address","tel","email","department","designation","joiningDate"].map((field) => (
                  <Grid item xs={12} sm={field==="department"?12:6} key={field}>
                    {field==="department" ? (
                      <Select fullWidth size="small" name="department" value={selectedEmployee.department||""} onChange={handleFieldChange}>
                        {departments.map((dep)=><MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
                      </Select>
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        label={field.replace(/([A-Z])/g," $1").replace(/^./,str=>str.toUpperCase())}
                        name={field}
                        type={field==="joiningDate"?"date":"text"}
                        value={selectedEmployee[field]||""}
                        onChange={handleFieldChange}
                        InputLabelProps={field==="joiningDate"?{shrink:true}:{}}
                        InputProps={{ readOnly: field==="employeeId" }}
                        sx={{ backgroundColor: field==="employeeId"?"#f0f0f0":"#fff", color: field==="employeeId"?"#999":"#000" }}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", p: 2 }}>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ bgcolor: "#67BCE0", ":hover": { bgcolor: "#fff" }, borderRadius: "60px", border: "3px solid #000", color: "#000", px: 4, textTransform:"none"}}>Cancel</Button>
          <Button onClick={handleSaveUpdate} variant="contained" sx={{ bgcolor:"#4CAF50", ":hover":{bgcolor:"#fff"}, borderRadius:"60px", border:"3px solid #000", color:"#000", px:4, textTransform:"none"}}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Redesigned Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onClose={handleCancelDelete} fullWidth maxWidth="xs">
        <DialogTitle sx={{ color: "#E53935", textAlign: "center", fontWeight: "bold", fontSize: "1.3rem", py: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ p:3, border: "3px solid #E53935", borderRadius: "20px", textAlign:"center", backgroundColor:"#FFEBEE" }}>
          Are you sure you want to remove employee <strong>{deleteConfirm.employee?.employeeId}</strong> from the list?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb:2 }}>
          <Button onClick={handleCancelDelete} sx={{ bgcolor:"#B0BEC5", ":hover":{bgcolor:"#90A4AE"}, borderRadius:"30px", px:4, textTransform:"none", color:"#000" }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} sx={{ bgcolor:"#E53935", ":hover":{bgcolor:"#FF1744"}, borderRadius:"30px", px:4, textTransform:"none", color:"#fff" }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
