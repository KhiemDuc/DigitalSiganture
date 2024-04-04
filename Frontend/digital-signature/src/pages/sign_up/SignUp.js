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
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

// TODO remove, this demo shouldn't need to reset the theme.

const theme = createTheme({
  typography: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordC, setShowPasswordC] = React.useState(false);
  const handleClickShowPasswordC = () => {
    setShowPasswordC(!showPasswordC);
  };

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
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string().min(
                12,
                "Tài khoản phải có ít nhất 8 ký tự"
              ),
              password: Yup.string().min(
                12,
                "Mật khẩu phải có nhiều hơn 12 ký tự"
              ),
              confirmPassword: Yup.string().min(
                12,
                "Mật khẩu phải có nhiều hơn 12 ký tự"
              ),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Mật khẩu không khớp"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                console.log({
                  firstname: values.firstname,
                  lastname: values.lastname,
                  email: values.email,
                  password: values.password,
                });
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

                    <div
                      id="emailHelp"
                      className="form-text"
                      style={{ textAlign: "start" }}
                    >
                      Chúng tôi sẽ không chia sẻ email của bạn cho bất kỳ ai.
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Tên Tài Khoản"
                      name="username"
                      autoComplete="userName"
                      {...formik.getFieldProps("username")}
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Tôi muốn nhận được khuyến mãi qua email."
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
