import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { clearMessage } from "../../redux/message";

const theme = createTheme({
  typography: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
});

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignInSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (formValue) => {
    const user = {
      userName: formValue.userName,
      password: formValue.password,
    };
    console.log(user);

    setLoading(true);

    dispatch(login(user))
      .unwrap()
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" paddingTop={10}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6}>
          <Box
            id="image"
            sx={(theme) => ({
              overflow: "hidden",
              mt: { xs: 8, sm: 10 },
              alignSelf: "center",
              width: "100%",
              backgroundSize: "cover",
            })}
          >
            {/* <Card sx={{ width: '100%', height: '100%'}}>
            <CardMedia
              component="iframe"
              alt="green iguana"
              width={'100%'}
              height={'100%'}
              image="../static/video/burbank.mp4"
              autoPlay
            />
          </Card> */}
            <img
              width="60%"
              height="60%"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="login"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                // password: Yup.string().min(
                //   12,
                //   "Mật khẩu phải có nhiều hơn 12 ký tự"
                // ),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  setSubmitting(false);
                  handleLogin(values);
                }, 400);
              }}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Tài Khoản"
                    name="userName"
                    autoFocus
                    padding={6}
                    type="text"
                    {...formik.getFieldProps("userName")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật Khẩu"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    padding={6}
                    {...formik.getFieldProps("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div
                      className="form-text"
                      style={{ textAlign: "start", color: "red" }}
                    >
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <Grid
                    container
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid></Grid>
                    <Grid>
                      <Link
                        to="/forgot_password/search_user"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                      >
                        Quên Mật Khẩu?
                      </Link>
                    </Grid>
                  </Grid>
                  {message && (
                    <div
                      className="form-text"
                      style={{ textAlign: "center", color: "red" }}
                    >
                      {message}
                    </div>
                  )}
                  <button
                    style={{
                      margin: "20px",
                      backgroundColor: "#6655ff",
                      borderRadius: "15px",
                      padding: "10px",
                      color: "white",
                      width: "100%",
                      border: "none",
                    }}
                    className="!p-3 button-hover"
                    type="submit"
                  >
                    Đăng Nhập
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </button>
                  Nếu bạn chưa có tài khoản?
                  <Link
                    to="/sign_up"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    {"Đăng Ký Ngay!"}
                  </Link>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
