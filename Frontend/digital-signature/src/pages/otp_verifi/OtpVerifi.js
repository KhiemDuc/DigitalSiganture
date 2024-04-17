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
import { clearMessage, setMessage } from "../../redux/message";
import { verifyOtp } from "../../redux/authSlice";
import AuthService from "../../services/auth.service";
import { useSelector } from "react-redux";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OTPVerifi({ otpHandle }) {
  const [OTP, setOTP] = React.useState("");
  const { message } = useSelector((state) => state.message);
  const [disableResend, setDisableResend] = React.useState(false);
  const [countdown, setCountdown] = React.useState(null);
  const { tokenSignUp, tokenForgot } = useParams();
  const [successful, setSuccessful] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnload = (event) => {
    event.preventDefault();
    // Chrome requires returnValue to be set.const handleUnload = (event) => {
  };

  React.useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleResendOTP = () => {
    setDisableResend(true);
    setCountdown(30);
    AuthService.resendOtp(tokenSignUp || tokenForgot)
      .then((response) => {
        setSuccessful(true);
      })
      .catch((error) => {
        setCountdown(120);
        setDisableResend(true);
        setSuccessful(false);
      });
    // Logic to resend OTP goes here
  };
  const handleVerify = () => {
    const verify = {
      otp: OTP,
      token: tokenSignUp || tokenForgot,
    };
    console.log(verify);
    switch (otpHandle) {
      case "otp_signup":
        dispatch(verifyOtp(verify))
          .unwrap()
          .then((response) => {
            console.log(response.data);

            navigate({
              pathname: "/",
            });
          })
          .catch((error) => {
            setSuccessful(false);
          });
        break;
      case "otp_forgot_password":
        AuthService.confirmOtpResetPassword(verify.token, verify.otp)
          .then((response) => {
            console.log(response.data);
            navigate(
              "/forgot_password/new_password/" + response.data.data.token
            );
          })
          .catch((error) => {
            dispatch(setMessage(error.response.data.message));
            setSuccessful(false);
          });
        break;
      default:
    }
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
            style={{ textAlign: "left" }}
            // borderBottom={"1px solid #ccc"}
          >
            Nhập mã xác thực
          </Typography>
          <Typography component="h3" variant="body1">
            Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số.
          </Typography>
          <Box component="form" sx={{ mt: 3, width: "500px", padding: "20px" }}>
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
            {message ? (
              !successful ? (
                <div
                  className="form-text"
                  style={{
                    textAlign: "center",
                    color: "red",
                    marginTop: "10px",
                  }}
                >
                  Xác thực không thành công. Vui lòng kiểm tra lại mã xác thực.
                </div>
              ) : (
                <div
                  className="form-text"
                  style={{
                    textAlign: "left",
                    color: "blue",
                    marginTop: "10px",
                  }}
                >
                  Mã xác thực đã được gửi lại tới thư của bạn. Nếu không tìm
                  thấy hãy kiểm tra ở thư mục spam
                </div>
              )
            ) : (
              successful && (
                <div
                  className="form-text"
                  style={{
                    textAlign: "left",
                    color: "blue",
                    marginTop: "10px",
                  }}
                >
                  Mã xác thực đã được gửi lại tới thư của bạn.Nếu không tìm thấy
                  hãy kiểm tra ở thư mục spam
                </div>
              )
            )}
          </Box>

          <Grid
            style={{
              // marginTop: "40px",

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
                navigate("/");
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
