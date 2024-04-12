import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/authSlice";
import { clearMessage } from "../../redux/message";
import { Navigate, useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
});

export default function SignUp() {
  const [successful, setSuccessful] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordC, setShowPasswordC] = React.useState(false);
  const handleClickShowPasswordC = () => {
    setShowPasswordC(!showPasswordC);
  };

  const handleSignUp = (values) => {
    const value = {
      email: values.email,
      userName: values.userName,
      password: values.password,
      phoneNumber: values.phoneNumber,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    setSuccessful(false);

    dispatch(signUp(value))
      .unwrap()
      .then((response) => {
        console.log(response.data);
        const token = response.data.signUpToken; // Lấy token từ response
        setSuccessful(true);
        navigate({
          pathname: "/sign_up/otp_verifi/" + token,
        });
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(8, "Tài khoản phải có ít nhất 8 ký tự"),
    password: Yup.string().min(12, "Mật khẩu phải có nhiều hơn 12 ký tự"),
    confirmPassword: Yup.string().min(
      12,
      "Mật khẩu phải có nhiều hơn 12 ký tự"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu không khớp"
    ),
  });

  const initial = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="../../../static/img/Knb.svg"
            sx={{ m: 2 }}
            variant="square"
            style={{ width: "170px" }}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Đăng Ký Tài Khoản
          </Typography>
          <Formik
            initialValues={initial}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                setSubmitting(false);
                handleSignUp(values);
              }, 400);
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="mt-5">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Tên"
                      autoFocus
                      {...formik.getFieldProps("firstName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Họ"
                      name="lastName"
                      autoComplete="family-name"
                      {...formik.getFieldProps("lastName")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Địa chỉ email"
                      name="email"
                      autoComplete="email"
                      {...formik.getFieldProps("email")}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Số điện thoại"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div
                        className="form-text"
                        style={{ textAlign: "start", color: "red" }}
                      >
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Tên Tài Khoản"
                      name="userName"
                      autoComplete="userName"
                      {...formik.getFieldProps("userName")}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div
                        className="form-text"
                        style={{ textAlign: "start", color: "red" }}
                      >
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      {...formik.getFieldProps("password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Xác Nhận Mật khẩu"
                      type={showPasswordC ? "text" : "password"}
                      id="confirmPassword"
                      autoComplete="new-password"
                      {...formik.getFieldProps("confirmPassword")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPasswordC}>
                              {showPasswordC ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div
                        className="form-text"
                        style={{ textAlign: "start", color: "red" }}
                      >
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
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
                  Đăng Ký
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    Nếu bạn có hãy có tài khoản?
                    <Link
                      to="/sign_in"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Đăng Nhập
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
