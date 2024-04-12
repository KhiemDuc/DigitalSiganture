import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BackHome from "../../components/BackHome";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../redux/message";
import { verifyOtp } from "../../redux/authSlice";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OTPVerifi() {
  const [OTP, setOTP] = React.useState("");
  const [disableResend, setDisableResend] = React.useState(false);
  const [countdown, setCountdown] = React.useState(null);
  const { tokenSignUp } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleResendOTP = () => {
    setDisableResend(true);
    setCountdown(30);
    // Logic to resend OTP goes here
  };
  const handleVerify = () => {
    console.log(OTP);
    const verify = {
      otp: OTP,
      token: tokenSignUp,
    };
    dispatch(verifyOtp(verify))
      .unwrap()
      .then((response) => {
        console.log(response.data);
        // setSuccessful(true);
        navigate({
          pathname: "/",
        });
      })
      .catch(() => {
        // setSuccessful(false);
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
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <CssBaseline />
        <BackHome />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "8px",
            boxShadow:
              "1px 1px 2px rgba(0, 0, 0, .1), 0 2px 4px rgba(0, 0, 0, .1)",
            margin: "auto",
            width: "500px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            padding={"10px"}
            // borderBottom={"1px solid #ccc"}
          >
            Nhập mã xác thực
          </Typography>
          <Typography component="h3" variant="body1">
            Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số.
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3, width: "500px", padding: "20px 20px 0 20px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Mã xác thực"
                  required
                  fullWidth
                  value={OTP}
                  name="OTP"
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
          </Box>
          <Grid
            style={{
              marginTop: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              borderTop: "1px solid rgba(0, 0, 0, .1)",
              padding: "5px 20px",
              width: "100%",
            }}
          >
            <Button
              sx={{ mt: 1, mb: 2, mr: 2 }}
              style={{
                backgroundColor: "#ccc",
                size: "small",
                padding: "10px",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                // Logic to navigate to home goes here
              }}
            >
              Huỷ
            </Button>
            <Button
              sx={{ mt: 1, mb: 2 }}
              style={{
                backgroundColor: "#6655ff",
                size: "small",
                padding: "10px",
                color: "white",
                border: "none",
              }}
              onClick={handleVerify}
            >
              Tiếp Tục
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
