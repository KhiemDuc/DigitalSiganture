import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackHome from "../../components/BackHome";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function NewPassword() {
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = React.useState(false);
  const { tokenForgot } = useParams();

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

  const validationSchema = Yup.object({
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
    password: "",
    confirmPassword: "",
  };

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
            width: "580px",
            padding: "30px 30px 0 30px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            padding={"10px 0px"}
            // borderBottom={"1px solid #ccc"}
            align="left"
            style={{ width: "100%" }}
          >
            Mật khẩu mới
          </Typography>

          <Typography
            component="h3"
            variant="body1"
            style={{ width: "100%", textAlign: "left" }}
          >
            Nhập mật khẩu mới và xác nhận mật khẩu để đặt lại mật khẩu của bạn
          </Typography>
          <Formik
            initialValues={initial}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                setSubmitting(false);
                handleSubmit(values);
              }, 400);
            }}
          >
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                className="mt-4"
                style={{ width: "100%" }}
              >
                <Grid container spacing={2} style={{ overflow: "hidden" }}>
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
                      autoComplete="confirmPassword"
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
                  <Divider
                    sx={{ margin: "20px", opacity: "1", width: "100%" }}
                  />
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "end",
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
                      onClick={() => {}}
                    >
                      Tiếp Tục
                    </Button>
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
