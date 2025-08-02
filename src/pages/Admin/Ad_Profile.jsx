import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EmployeeProfileForm() {
  const [photo, setPhoto] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  const handleEditClick = () => {
    const currentValues = getValues();
    setEditData({
      fullName: currentValues.fullName || "",
      tel: currentValues.tel || "",
      email: currentValues.email || "",
    });
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    setValue("fullName", editData.fullName);
    setValue("tel", editData.tel);
    setValue("email", editData.email);
    setOpenEditDialog(false);
  };

  return (
    <Box>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6">Employee - Employee Name</Typography>
          <Box>
            <IconButton>
              <span role="img" aria-label="bell">
                🔔
              </span>
            </IconButton>
            <IconButton>
              <span role="img" aria-label="user">
                👤
              </span>
            </IconButton>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Upload Photo */}
          <Card sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={photo}
                  sx={{ width: 80, height: 80, border: "2px solid #000" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={500}>
                  Upload Photo <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  type="file"
                  fullWidth
                  size="small"
                  onChange={handlePhotoChange}
                  inputProps={{ accept: "image/*" }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={handleEditClick}>
                  <Edit />
                </IconButton>
              </Grid>
            </Grid>
          </Card>

          {/* Personal Details */}
          <Card sx={{ backgroundColor: "#e5f6fd", p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {[
                { name: "employeeId", label: "Employee ID" },
                { name: "fullName", label: "Full Name" },
                { name: "address", label: "Address" },
                { name: "tel", label: "Tel" },
                { name: "email", label: "Email" },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    label={`${field.label} *`}
                    fullWidth
                    size="small"
                    {...register(field.name, { required: true })}
                    error={!!errors[field.name]}
                    helperText={
                      errors[field.name] && "This field is required"
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Change Password"
                  type="password"
                  fullWidth
                  size="small"
                  {...register("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Card>

          {/* Company Details */}
          <Card sx={{ backgroundColor: "#e5f6fd", p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Company Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {[
                { name: "department", label: "Department" },
                { name: "designation", label: "Designation" },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    label={`${field.label} *`}
                    fullWidth
                    size="small"
                    {...register(field.name, { required: true })}
                    error={!!errors[field.name]}
                    helperText={
                      errors[field.name] && "This field is required"
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Joining Date *"
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  {...register("joiningDate", { required: true })}
                  error={!!errors.joiningDate}
                  helperText={
                    errors.joiningDate && "Joining Date is required"
                  }
                />
              </Grid>
            </Grid>
          </Card>

          {/* Submit Button */}
          <Box textAlign="right" mt={4}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#6ECEDA",
                color: "#000",
                borderRadius: "20px",
                width: 100,
                "&:hover": { backgroundColor: "#56c0cc" },
              }}
            >
              OK
            </Button>
          </Box>
        </form>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Personal Details</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                size="small"
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tel"
                fullWidth
                size="small"
                value={editData.tel}
                onChange={(e) =>
                  setEditData({ ...editData, tel: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                size="small"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
