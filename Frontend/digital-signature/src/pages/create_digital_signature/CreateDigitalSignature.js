import { Box } from "@mui/system";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import forge from "node-forge";
import { saveAs } from "file-saver";
import CertificateService from "../../services/certificate.service";
import { ToastContainer } from "react-toastify";
import React from "react";
import { showToast, ToastType } from "../../common/toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";

const CreataDigitalSignature = () => {
  const [pemData, setPemData] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordC, setShowPasswordC] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordC = () => {
    setShowPasswordC(!showPasswordC);
  };
  useEffect(() => {
    document.title = "Tạo chữ ký số";
    let element = document.querySelector(".fda3723591e0b38e7e52");

    if (element) {
      element.remove();
    }
  }, []);

  const handleFileChange = (event) => {
    if (!event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file.name.endsWith(".pem")) {
      showToast("Vui lòng chọn file .pem", ToastType.ERROR);
      event.target.value = null;
      return;
    }
    reader.onload = (e) => {
      setPemData(e.target.result);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClick = (values) => {
    console.log(pemData);
    if (pemData == "") {
      showToast("Vui lòng chọn file private key", ToastType.ERROR);
      return;
    }
    CertificateService.getCertificate()
      .then((response) => {
        genPfx(pemData, response.data.data, values.password);
      })
      .catch((error) => {
        showToast(error.response.data.reason, ToastType.ERROR);
      });
  };

  const genPfx = (privateKey, cert, password) => {
    var priv = forge.pki.privateKeyFromPem(privateKey);
    var certi = forge.pki.certificateFromPem(cert);
    var password = password;
    const p12Asn1 = forge.pkcs12.toPkcs12Asn1(priv, [certi], password);

    const der = forge.asn1.toDer(p12Asn1).getBytes();
    var p12b64 = forge.util.encode64(der);
    const blob = new Blob([p12b64], { type: "application/x-pkcs12" });
    saveAs(blob, "out.pfx");
  };

  return (
    <Layout
      heading={"Tạo chữ ký số"}
      subheading={
        <>
          `Hãy nhập file chứng chỉ (.cer hoặc .crt), khoá bí và mật khẩu để tạo
          chữ ký số của bạn.
          <br />
          *Lưu ý: Bạn phải chọn khoá bí mật trùng khớp với chứng chỉ đã chọn` (
          Khoá bí mật được bạn tạo ra yêu cầu cấp chứng chỉ )
        </>
      }
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string().min(12, "Mật khẩu phải có nhiều hơn 12 ký tự"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
            .required("Vui lòng xác nhận mật khẩu"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            setSubmitting(false);
            handleClick(values);
          }, 400);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Box>
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
              <div
                className="form-group"
                style={{
                  padding: "10px",
                }}
              >
                <label htmlFor="privateKey">
                  Nhập khoá bí mật của bạn định dạng .pem
                </label>
                <input
                  onChange={handleFileChange}
                  className="form-control"
                  id="privateKey"
                  type="file"
                  accept=".pem"
                />
              </div>

              <div
                className="form-group"
                style={{
                  padding: "10px",
                }}
              >
                <label htmlFor="password">
                  Nhập mật khẩu cho chữ ký số của bạn
                </label>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
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
              </div>
              <div
                className="form-group"
                style={{
                  padding: "10px",
                }}
              >
                <label htmlFor="password">Xác nhận mật khẩu của bạn</label>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  type={showPasswordC ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
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
              </div>
              <div
                className="form-group"
                style={{
                  padding: "10px",
                }}
              >
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleClick()}
                >
                  Tạo chữ ký số
                </button>
              </div>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreataDigitalSignature;
