import Layout from "../../components/Layout";
import forge from "node-forge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CertificateService from "../../services/certificate.service";
import { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { saveAs } from "file-saver";
import { showToast, ToastType } from "../../common/toast";
import { ToastContainer } from "react-toastify";
import payment from "../../services/payment.service";

export default function ExtendCertificate() {
  const [modulusLength, setModulusLength] = useState(2048);
  useEffect(() => {
    document.title = "Gia hạn chứng chỉ số";
    let element = document.querySelector(".fda3723591e0b38e7e52");

    if (element) {
      element.remove();
    }
    payment
      .getMySubCriptionPlan()
      .then((res) => {
        setModulusLength(res.data.data.plan.name === "standard" ? 2048 : 4096);
      })
      .catch((err) => console.log(err));
  }, []);
  const [showPassword, setShowPassword] = React.useState(true);
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const generateKeyPair = () => {
    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair({
      bits: modulusLength,
      e: 0x10001,
    });

    // Convert keys to PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

    setPrivateKey(privateKeyPem);
    setPublicKey(publicKeyPem);
  };

  const handleClick = () => {
    if (publicKey === "") {
      showToast("Vui lòng tạo cặp khoá trước khi gửi yêu cầu", ToastType.ERROR);
      return;
    }
    CertificateService.extendCertificate(publicKey)
      .then((response) => {
        console.log(response);
        showToast("Yêu cầu gia hạn chứng chỉ thành công", ToastType.SUCCESS);
      })
      .catch((err) => {
        console.log(err);
        showToast(err.response.data.message, ToastType.ERROR);
      });
  };

  return (
    <Layout
      heading={"Gia hạn chứng chỉ số"}
      subheading={
        "Gửi yêu cầu gia hạn lại hoặc cấp lại chứng chỉ số của bạn khi đã hết hạn"
      }
    >
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
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "65%",
          }}
        >
          <button
            className="btn btn-outline-dark"
            style={{
              boxShadow: "5px 5px 5px #d1c1f1",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            onClick={() => generateKeyPair()}
          >
            Tạo cặp khoá 🔐
          </button>
          <Tooltip
            followCursor
            title="Bạn vui lòng lưu trũ và cất giữ khoá bí mật một cách cẩn thận trước khi gửi yêu cầu"
          >
            <button
              className="btn btn-outline-dark"
              style={{
                boxShadow: "5px 5px 5px #d1c1f1",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              onClick={() => {
                handleClick();
              }}
            >
              Gia hạn chứng chỉ {"->"}
            </button>
          </Tooltip>
        </div>

        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            width: "65%",
            flexDirection: "column",
          }}
        >
          <h5
            style={{
              alignSelf: "flex-start",
            }}
          >
            Khoá công khai
          </h5>
          <div
            style={{
              width: "100%",
              height: "130px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow:
                "rgba(49, 130, 206, 0.3) 5px 5px, rgba(49, 130, 206, 0.2) 10px 10px, rgba(49, 130, 206, 0.2) 15px 15px",
              padding: "5px",
              outline: "none",
              resize: "none",
              position: "relative",
            }}
          >
            <textarea
              className="w-100 px-4 h-100"
              readOnly={true}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                outline: "none",
                resize: "none",
              }}
              value={publicKey}
            ></textarea>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Sao chép!"
            >
              <IconButton
                aria-label="delete"
                color="#ccc"
                sx={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  right: 20,
                }}
                onClick={() => {
                  navigator.clipboard.writeText(publicKey);
                }}
              >
                <ContentCopyIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            width: "65%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="w-100 mt-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
            }}
          >
            <h5 class="text-center">Khoá bí mật 🔏</h5>
            <h6 class="text-center">
              (Đây là phần quan trong của chữ ký số của bạn, hãy lưu trữ một
              cách cẩn thận)
            </h6>
          </div>
          <div
            style={{
              width: "100%",
              height: "200px",
              position: "relative",
              boxShadow:
                "rgba(49, 130, 206, 0.3) 5px 5px, rgba(49, 130, 206, 0.2) 10px 10px, rgba(49, 130, 206, 0.2) 15px 15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                backdropFilter: "blur(8px)",
                padding: "10px",
                display: showPassword ? "block" : "none",
              }}
            />
            <textarea
              readOnly={true}
              className="w-100 px-4 h-100"
              style={{
                outline: "none",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
              value={privateKey}
            ></textarea>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Tải xuống và cất giữ khoá bí mật một cách cẩn thận"
            >
              <IconButton
                aria-label="delete"
                color="#ccc"
                sx={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  right: 20,
                }}
                onClick={() => {
                  if (privateKey == "") {
                    return;
                  }
                  const blob = new Blob([privateKey], {
                    type: "application/x-pem-file",
                  });
                  saveAs(blob, "private_key.pem");
                }}
              >
                <ArrowDownwardIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Hiển thị khoá bí mật"
            >
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 20,
                }}
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </Layout>
  );
}
