import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

export default function Ad_ProfileForm({ isAdmin = true, mode = "add", defaultData = {} }) {
  const [photo, setPhoto] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAddConfirmDialog, setOpenAddConfirmDialog] = useState(false);
  const [pendingUpdateData, setPendingUpdateData] = useState(null);
  const [pendingAddData, setPendingAddData] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({ defaultValues: defaultData });

  const isAddMode = mode === "add";

  const whiteInputStyle = { backgroundColor: "#ffffff" };
  const requiredLabelProps = {
    required: true,
    sx: { "& .MuiFormLabel-asterisk": { color: "red" } }
  };

  const handleAddClick = () => {
    const formData = getValues();
    setPendingAddData(formData);
    setOpenAddConfirmDialog(true);
  };

  const handleAddConfirm = () => {
    console.log("Add Employee:", pendingAddData);
    setSnackbar({ open: true, message: "New employee added successfully." });
    reset();
    setOpenAddConfirmDialog(false);
    setPendingAddData(null);
  };

  const handleUpdateClick = () => {
    setOpenUpdateDialog(true);
  };

  const handleDialogOkClick = () => {
    const updatedData = getValues();
    setPendingUpdateData(updatedData);
    setOpenUpdateDialog(false);
    setOpenConfirmDialog(true);
  };

  const handleConfirm = () => {
    console.log("Updated Data:", pendingUpdateData);
    setSnackbar({ open: true, message: "Employee details updated by Admin." });
    setOpenConfirmDialog(false);
    setPendingUpdateData(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <form noValidate>
          <Card sx={{ backgroundColor: "#e5f6fd", p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center" direction={isMobile ? "column" : "row"}>
              <Grid item>
                <Avatar src={photo} sx={{ width: 60, height: 60 }} />
              </Grid>
              <Grid item xs>
                <Typography>Employee Photo</Typography>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ backgroundColor: "#e5f6fd", p: 2, mb: 2 }}>
            <Typography fontWeight="bold" mb={1}>Employee Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container direction="column" spacing={2}>
              {[ "employeeId", "fullName", "address", "tel", "email", "password" ].map((field) => (
                <Grid item key={field}>
                  <TextField
                    label={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    fullWidth
                    size="small"
                    type={field === "password" ? "password" : "text"}
                    disabled={!isAddMode}
                    {...register(field, { required: true })}
                    InputLabelProps={requiredLabelProps}
                    sx={whiteInputStyle}
                    error={!!errors[field]}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ backgroundColor: "#e5f6fd", p: 2, mb: 2 }}>
            <Typography fontWeight="bold" mb={1}>Company Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container direction="column" spacing={2}>
              {[ "department", "designation" ].map((field) => (
                <Grid item key={field}>
                  <TextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    fullWidth
                    size="small"
                    disabled={!isAddMode}
                    {...register(field, { required: true })}
                    InputLabelProps={requiredLabelProps}
                    sx={whiteInputStyle}
                    error={!!errors[field]}
                  />
                </Grid>
              ))}
              <Grid item>
                <TextField
                  label="Joining Date"
                  type="date"
                  fullWidth
                  size="small"
                  disabled={!isAddMode}
                  InputLabelProps={{ shrink: true, ...requiredLabelProps }}
                  {...register("joiningDate", { required: true })}
                  error={!!errors.joiningDate}
                  sx={whiteInputStyle}
                />
              </Grid>
            </Grid>
          </Card>

          <Box
            textAlign="right"
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
            justifyContent="flex-end"
          >
            {isAddMode ? (
              <Button
                type="button"
                variant="contained"
                onClick={handleAddClick}
                sx={{
                  borderRadius: "60px",
                  textTransform: "none",
                  bgcolor: "#2196F3",
                  border: "3px solid #000000",
                  color: "#fff",
                  boxShadow: 2,
                  ":hover": { bgcolor: "#1976D2" },
                  width: isMobile ? "100%" : "auto"
                }}
              >
                Add
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                onClick={handleUpdateClick}
                sx={{
                  bgcolor: "#4CAF50",
                  ":hover": { bgcolor: "#ffffff" },
                  borderRadius: "60px",
                  border: "3px solid #000000",
                  color: "#000000",
                  textTransform: "none",
                  boxShadow: 2,
                  width: isMobile ? "100%" : "auto"
                }}
              >
                Update
              </Button>
            )}
          </Box>
        </form>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Employee Details</DialogTitle>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            {[ "employeeId", "fullName", "address", "tel", "email", "department", "designation" ].map((field) => (
              <Grid item key={field}>
                <TextField
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  fullWidth
                  size="small"
                  required
                  {...register(field, { required: true })}
                  error={!!errors[field]}
                  InputLabelProps={requiredLabelProps}
                  sx={{ backgroundColor: "#fff" }}
                />
              </Grid>
            ))}
            <Grid item>
              <TextField
                label="Joining Date"
                type="date"
                fullWidth
                size="small"
                required
                InputLabelProps={{ shrink: true, ...requiredLabelProps }}
                {...register("joiningDate", { required: true })}
                error={!!errors.joiningDate}
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button onClick={handleDialogOkClick} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Final Confirmation for Update */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this employee's profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation for Add */}
      <Dialog open={openAddConfirmDialog} onClose={() => setOpenAddConfirmDialog(false)}>
        <DialogTitle>Confirm Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to add this new employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleAddConfirm} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
