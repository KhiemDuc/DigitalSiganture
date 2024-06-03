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
      console.log(e.target.result);
      setPemData(e.target.result);
    };
    reader.readAsText(file);
  };

  const signString = (privateKey, message) => {
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const privKey = forge.pki.privateKeyFromPem(privateKey);
    const signature = privKey.sign(md);
    return forge.util.encode64(signature);
  };

  const verifySignature = (publicKey, message, signature) => {
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const decodedSignature = forge.util.decode64(signature);
    return publicKey.verify(md.digest().bytes(), decodedSignature);
  };

  const getPublicKeyFromCertificate = (certificatePem) => {
    const certificate = forge.pki.certificateFromPem(certificatePem);
    console.log(certificate.publicKey);
    return certificate.publicKey;
  };

  const handleClick = (values) => {
    if (values.password === "") {
      showToast("Vui lòng nhập mật khẩu", ToastType.ERROR);
      return;
    }
    if (pemData == "") {
      showToast("Vui lòng chọn file private key", ToastType.ERROR);
      return;
    }
    CertificateService.getCertificate()
      .then((response) => {
        const message = "Hello, World!";
        const publicKey = getPublicKeyFromCertificate(response.data.data);
        const privateKey = forge.pki.privateKeyFromPem(pemData);
        const md = forge.md.sha256.create();
        md.update(message, "utf8");
        const md2 = forge.md.sha256.create();
        md2.update(message, "utf8");
        const signature = privateKey.sign(md);
        try {
          const verified = publicKey.verify(md.digest().bytes(), signature);
          if (verified) {
            genPfx(pemData, response.data.data, values.password);
          } else {
            showToast(
              "Khoá bí mật và chứng chỉ không trùng khớp",
              ToastType.ERROR
            );
          }
        } catch (e) {
          showToast(
            "Khoá bí mật và chứng chỉ không trùng khớp",
            ToastType.ERROR
          );
        }

        // const verified = verifySignature(publicKey, message, signature);
      })
      .catch((error) => {
        console.log(error);
        showToast("Có lỗi gì đó", ToastType.ERROR);
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
    saveAs(blob, "digitalSignature.pfx");
  };

  return (
    <Layout
      heading={"Tạo chữ ký số"}
      subheading={
        <>
          `Hãy nhập file chứa khoá bí và mật khẩu để tạo chữ ký số của bạn.
          <br />
          *Lưu ý: Bạn phải chọn khoá bí mật trùng khớp với chứng chỉ đã chọn` (
          Khoá bí mật được bạn tạo ra yêu cầu cấp chứng chỉ )
        </>
      }
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(12, "Mật khẩu phải có nhiều hơn 12 ký tự")
            .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
            .matches(
              /[^a-zA-Z0-9]/,
              "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
            )
            .required("Mật khẩu là bắt buộc"),
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
                <button type="submit" className="btn btn-outline-primary">
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
