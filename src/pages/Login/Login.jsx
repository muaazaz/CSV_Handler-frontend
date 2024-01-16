import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassText,
  headerText,
  loginForm,
  logo,
  mainContainer,
  welcomeText,
} from "./styles";
import { setGlobalData } from "../../RTKQuery/globalSlice";

const Login = () => {
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    }),
    [error, setError] = useState(""),
    navigate = useNavigate(),
    data = useSelector((state) => state.userValidation),
    dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(dispatch(setGlobalData({ navTab: "dashboard" })));
    navigate("/dashboard");
  };
  useEffect(() => {
    if (data?.error) {
      setError(data?.error);
    } else if (data?.token) {
      navigate("/dashboard");
    }
  }, [data, navigate]);
  return (
    <Container sx={mainContainer}>
      <img style={logo} src="gigalabs.png" alt="" />
      <Box sx={loginForm} component="form" onSubmit={handleFormSubmit}>
        <Box sx={headerText}>
          <Typography sx={welcomeText}>Welcome Back!</Typography>
          <Typography
            sx={{ color: "gray", textAlign: "center", margin: "0" }}
            variant="caption"
            noWrap
          >
            Enter your credentials to access your account.
          </Typography>
        </Box>
        <TextField
          sx={{ width: "90%" }}
          label="Email"
          placeholder="Enter your Email address"
          value={formData.email}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.currentTarget.value,
            });
          }}
        ></TextField>
        <TextField
          sx={{ width: "90%" }}
          type="password"
          label="Password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(e) => {
            setError("");
            setFormData({
              ...formData,
              password: e.currentTarget.value,
            });
          }}
        ></TextField>
        <Button
          type="submit"
          color="secondary"
          sx={{ width: "80%", color: "white" }}
          variant="contained"
        >
          Sign In
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Typography sx={forgotPassText} variant="p" noWrap>
        Forgot your Password ? <Link to="/forgot/password">Reset Password</Link>
      </Typography>
    </Container>
  );
};

export default Login;
