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
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EmployeeProfileForm() {
  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempPhoto(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setTempPhoto(photo);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    setPhoto(tempPhoto);
    setOpenEditDialog(false);
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Box>
      {/* Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Create New Password</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" mb={2}>
            Employees can create their own password. Make sure it is strong and secure.
          </Typography>
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            margin="dense"
            {...register("newPassword", { required: true, minLength: 6 })}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? "Password must be at least 6 characters" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            margin="dense"
            {...register("confirmPassword", { required: true })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? "Please confirm your password" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit((data) => {
              if (data.newPassword !== data.confirmPassword) {
                alert("Passwords do not match!");
              } else {
                setValue("password", data.newPassword);
                setIsEditingPassword(true);
                setOpenPasswordDialog(false);
              }
            })}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Form Card */}
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Employee - Employee Name</Typography>
          <Box>
            <IconButton>🔔</IconButton>
            <IconButton>👤</IconButton>
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
                <Typography fontWeight={500}>Upload Photo</Typography>
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
            <Typography variant="h6" gutterBottom>Personal Details</Typography>
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
                    label={field.label}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                    {...register(field.name)}
                  />
                </Grid>
              ))}

              {/* Change Password */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    label="Change Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: !isEditingPassword,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password")}
                  />
                  <IconButton onClick={() => setOpenPasswordDialog(true)}>
                    <Edit />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Company Details */}
          <Card sx={{ backgroundColor: "#e5f6fd", p: 3 }}>
            <Typography variant="h6" gutterBottom>Company Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {[
                { name: "department", label: "Department" },
                { name: "designation", label: "Designation" },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    label={field.label}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                    {...register(field.name)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Joining Date"
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: true }}
                  {...register("joiningDate")}
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

      {/* Photo Upload Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Profile Photo</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar src={tempPhoto} sx={{ width: 100, height: 100 }} />
            <Button variant="outlined" component="label">
              Upload New Photo
              <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
