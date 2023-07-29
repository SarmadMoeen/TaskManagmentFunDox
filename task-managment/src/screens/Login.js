import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, CssBaseline, TextField, Typography, Card, CardContent, InputAdornment, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import background from "../assets/background/background.jpg";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext"; // Import AuthContext

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formValues;

    if (!email || !password) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        Login(response.data.user); // Set the user data in the context
        navigate("/home");
      } else {
        alert(response.data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Please try correct Email and Password");
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
                Login
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
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formValues.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
                <Link to="/" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
