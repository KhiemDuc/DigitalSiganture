import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { setMessage, clearMessage } from "../redux/message";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserService from "../services/user.service";
const defaultTheme = createTheme();

const ChangeCurrentPassword = () => {
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const [successful, setSuccessful] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(setMessage(""));
    UserService.changeCurrentPasssword({
      password: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then((response) => {
        notify();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(setMessage(resMessage));
      });
    console.log(values);
  };

  const notify = () => {
    toast.success("Đổi mật khẩu thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
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
    currentPassword: Yup.string().required("Mật khẩu không được để trống"),
    newPassword: Yup.string().min(12, "Mật khẩu phải có nhiều hơn 12 ký tự"),
    confirmPassword: Yup.string().min(
      12,
      "Mật khẩu phải có nhiều hơn 12 ký tự"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Mật khẩu không khớp"
    ),
  });

  const initial = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          width: "80%",
        }}
      >
        <Typography
          component="h3"
          variant="body1"
          style={{
            width: "100%",
            textAlign: "left",
            fontWeight: "550",
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}
        >
          Mật khẩu của bạn phải có tối thiểu 12 ký tự, đồng thời bao gồm cả chữ
          số, chữ cái và ký tự đặc biệt (!$@%).
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
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    autoComplete="currentPassword"
                    {...formik.getFieldProps("currentPassword")}
                    sx={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
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
                  {formik.touched.currentPassword &&
                  formik.errors.currentPassword ? (
                    <div
                      className="form-text"
                      style={{ textAlign: "start", color: "red" }}
                    >
                      {formik.errors.currentPassword}
                    </div>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="Mật khẩu mới"
                    type={showPasswordC ? "text" : "password"}
                    id="newPassword"
                    autoComplete="newPassword"
                    sx={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                    {...formik.getFieldProps("newPassword")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPasswordC}>
                            {showPasswordC ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div
                      className="form-text"
                      style={{ textAlign: "start", color: "red" }}
                    >
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Xác Nhận Mật khẩu"
                    sx={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                    type={showPasswordC ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPasswordC}>
                            {showPasswordC ? <Visibility /> : <VisibilityOff />}
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
                  <div style={{ width: "100%", padding: "1rem", color: "red" }}>
                    Mật khẩu không chính xác
                  </div>
                )}
                <Divider sx={{ margin: "20px", opacity: "1", width: "100%" }} />
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
                      navigate("/");
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

                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                    type="submit"
                  >
                    {successful ? "Đi tới màn hình đăng nhập" : "Tiếp Tục"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default ChangeCurrentPassword;
