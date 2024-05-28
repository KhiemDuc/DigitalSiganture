import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, TextField, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import forge from "node-forge";
import { setState } from "../../setup/redux/signatureSlice";

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
const readFile = (file, format) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (format == "text") reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
};

export default function Login() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");

  // const arrayBufferToBinaryString = (buffer) => {
  //   var binary = "";
  //   var bytes = new Uint8Array(buffer);
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return binary;
  // };

  const readPemFormat = (pemFile, crtFile) => {
    console.log(pemFile, crtFile);
  };

  const readPfxFormat = async (pfxFile, password) => {
    var p12Asn1;
    var p12;

    try {
      const fileContent = await readFile(pfxFile, "text");
      const der = forge.util.decode64(fileContent);
      p12Asn1 = forge.asn1.fromDer(der);
    } catch (err) {
      const fileContent = await readFile(pfxFile, "binary");
      const uint8Array = new Uint8Array(fileContent);
      const forgeBuffer = forge.util.createBuffer(uint8Array);
      p12Asn1 = forge.asn1.fromDer(forgeBuffer.getBytes());
    }
    try {
      p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password || null);
      var bags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
      var keyBag =
        bags[forge.pki.oids.pkcs8ShroudedKeyBag][0] ??
        p12.getBags({ bagType: forge.pki.oids.keyBag })[
          forge.pki.oids.keyBag
        ][0];
      var certBag = p12.getBags({ bagType: forge.pki.oids.certBag })[
        forge.pki.oids.certBag
      ][0];
      // var key = bag.key;
      setState({ cert: certBag.cert, key: keyBag.key });
      navigate("/admin/dashboard");
      // console.log(bags, keyBag, certBag);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      if (selectedValue === "2") {
        if (values.pfx) {
          readPfxFormat(values.pfx, values.password);
        }
      } else if (selectedValue === "1") {
        if (values.pem && values.crt) readPemFormat(values.pem, values.crt);
      } else return;
    },
  });
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    formik.resetForm();
  };

  const handleChangePfx = (event) => {
    const file = event.target?.files[0];
    formik.setFieldValue("pfx", file);
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="form-select">Chọn định dạng</label>
                    <select
                      name="select"
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedValue}
                      onChange={handleSelectChange}
                    >
                      <option value={"0"}>
                        Chọn định dạng bạn muốn đăng nhập
                      </option>
                      <option value="1">PEM</option>
                      <option value="2">PKCS12</option>
                    </select>
                    {selectedValue === "2" && (
                      <>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Nhập định dạng file .p12, .pfx
                          </label>
                          <input
                            key={"pfx"}
                            name="pfx"
                            // value={formik.pfx?.name}
                            className="form-control"
                            id="exampleInputPassword1"
                            type="file"
                            accept=".p12, .pfx"
                            onChange={handleChangePfx}
                          />
                        </div>

                        <TextField
                          onChange={formik.handleChange}
                          fullWidth
                          autoComplete=""
                          size="small"
                          name="password"
                          type="password"
                          label="Mật khẩu"
                          variant="outlined"
                          sx={{ mt: 1.5 }}
                        />
                      </>
                    )}

                    {selectedValue === "1" && (
                      <>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Nhập định dạng file .pem
                          </label>
                          <input
                            key={"pem"}
                            onChange={(e) =>
                              formik.setFieldValue("pem", e.target.files[0])
                            }
                            name="pem"
                            className="form-control"
                            id="exampleInputPassword1"
                            type="file"
                            accept=".pem, .key"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Nhập định dạng file .cer hoặc .crt
                          </label>
                          <input
                            key={"crt"}
                            onChange={(e) =>
                              formik.setFieldValue("crt", e.target.files[0])
                            }
                            name="crt"
                            className="form-control"
                            id="exampleInputPassword1"
                            type="file"
                            accept=".cer, .crt"
                          />
                        </div>
                      </>
                    )}
                    <Button
                      type="submit"
                      loading={loading.toString()}
                      variant="contained"
                      sx={{
                        my: 2,
                        backgroundColor: "#6c63ff",
                        borderRadius: 3,
                      }}
                    >
                      Đăng Nhập
                    </Button>
                  </div>
                </form>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      </StyledRoot>
    </ThemeProvider>
  );
}
