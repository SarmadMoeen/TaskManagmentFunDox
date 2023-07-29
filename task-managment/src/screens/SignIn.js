import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, CssBaseline, TextField, Typography, Card, CardContent, InputAdornment, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import background from "../assets/background/background.jpg";
import axios from "axios";

const theme = createTheme();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setPasswordError(value !== formValues.password);
    setFormValues((prevValues) => ({
      ...prevValues,
      confirmPassword: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      confirmPassword: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks here before moving to the login page
    const { email, username, password, confirmPassword } = formValues;

    // Check if any field is empty
    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill all the required fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Move to the login page
      const response = await axios.post("http://localhost:3000/userRegister", {
        name: username,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        // Registration success, you can redirect the user to the login page here
        alert("Registration successful! Please login.");
      } else {
        alert(response.data.msg || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container component="main" maxWidth="xs" sx={{ mt: -17 }}>
          <CssBaseline />
          <Card variant="outlined" sx={{ borderRadius: 5, border: "2px solid black", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
            <CardContent>
              <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
                Sign Up
              </Typography>
              <form style={{ width: "100%" }} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formValues.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.email && !formValues.email}
                  helperText={touched.email && !formValues.email && "Email is required"}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formValues.username}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.username && !formValues.username}
                  helperText={touched.username && !formValues.username && "Username is required"}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.password && !formValues.password}
                  helperText={touched.password && !formValues.password && "Password is required"}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formValues.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.confirmPassword && passwordError}
                  helperText={touched.confirmPassword && passwordError && "Passwords do not match"}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Register
                </Button>
                <Link to="/login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
