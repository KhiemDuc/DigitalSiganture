import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [OTP, setOTP] = React.useState("");
  const [disableResend, setDisableResend] = React.useState(false);
  const [countdown, setCountdown] = React.useState(null);

  const handleResendOTP = () => {
    setDisableResend(true);
    setCountdown(30);
    // Logic to resend OTP goes here
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  React.useEffect(() => {
    let timer;
    if (disableResend) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        if (countdown === 0) {
          setDisableResend(false);
          clearInterval(timer);
        }
      }, 1000); // 1 second
    }
    return () => {
      clearInterval(timer);
    };
  }, [disableResend, countdown]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: "100vh", display: "flex" }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Quên Mật Khẩu
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cccd"
                  label="Căn cước công dân"
                  id="ccd"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mã xác thực"
                  required
                  fullWidth
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {disableResend ? (
                          <span style={{ color: "#ccc", fontSize: "14px" }}>
                            {countdown}
                          </span>
                        ) : (
                          <IconButton onClick={handleResendOTP}>
                            <AutorenewIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#6655ff",
                borderRadius: "15px",
                padding: "10px",
                color: "white",
                width: "100%",
                border: "none",
              }}
            >
              Tìm Kiếm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
