import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Grid, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center",
  },
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

export default function Login() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      //   await login(values.email, values.password);
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <StyledRoot> */}
      <StyledRoot>
        <Card className="card">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <div className="img-wrapper">
                <img
                  src="../src/assets/images/posting_photo.svg"
                  width="100%"
                  alt=""
                />
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div class="form-group">
                        <label htmlFor="form-select">Chọn định dạng</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={selectedValue}
                          onChange={handleSelectChange}
                        >
                          <option selected>
                            Chọn định dạng bạn muốn đăng nhập
                          </option>
                          <option value="1">PEM</option>
                          <option value="2">PKCS12</option>
                        </select>
                      </div>

                      {selectedValue === "2" && (
                        <>
                          <div class="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Nhập định dạng file .p12, .pfx
                            </label>
                            <input
                              className="form-control"
                              id="exampleInputPassword1"
                              type="file"
                              accept=".cer, .crt"
                            />
                          </div>

                          <TextField
                            fullWidth
                            size="small"
                            name="password"
                            type="password"
                            label="Mật khẩu"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            helperText={touched.password && errors.password}
                            error={Boolean(errors.password && touched.password)}
                            sx={{ mt: 1.5 }}
                          />
                        </>
                      )}

                      {selectedValue === "1" && (
                        <>
                          <div class="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Nhập định dạng file .pem
                            </label>
                            <input
                              className="form-control"
                              id="exampleInputPassword1"
                              type="file"
                              accept=".cer, .crt"
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Nhập định dạng file .cer hoặc .crt
                            </label>
                            <input
                              className="form-control"
                              id="exampleInputPassword1"
                              type="file"
                              accept=".cer, .crt"
                            />
                          </div>
                        </>
                      )}

                      <LoadingButton
                        type="submit"
                        loading={loading}
                        variant="contained"
                        sx={{
                          my: 2,
                          backgroundColor: "#6c63ff",
                          borderRadius: 3,
                        }}
                      >
                        Đăng Nhập
                      </LoadingButton>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      </StyledRoot>
    </ThemeProvider>
  );
}
