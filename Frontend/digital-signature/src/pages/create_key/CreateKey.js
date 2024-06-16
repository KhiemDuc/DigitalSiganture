import forge from "node-forge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";
import StepperCustom from "../../components/Steper";
import BackHome from "./../../components/BackHome";
import { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { saveAs } from "file-saver";
import CircularProgress from "@mui/material/CircularProgress";

const CreateKey = () => {
  useEffect(() => {
    document.title = "Tạo cặp khoá - Hệ thống chữ ký số";
    let element = document.querySelector(".fda3723591e0b38e7e52");

    if (element) {
      element.remove();
    }
    console.log("abc");
    // (async () => {
    //   const data = await payment.getMySubCriptionPlan();
    //   console.log(data);
    // })();
  }, []);
  const [showPassword, setShowPassword] = React.useState(true);
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const generateKeyPair = () => {
    setIsLoading(true);
    console.log(isLoading);
    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair({
      bits: 4096,
      e: 0x10001,
    });

    // Convert keys to PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    console.log(publicKeyPem);
    setPrivateKey(privateKeyPem);
    setPublicKey(publicKeyPem);
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          >
            <CircularProgress />
          </div>
        )}

        <BackHome />
        <StepperCustom
          step={1}
          sx={{
            width: "65%",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
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
          <button
            style={{
              textDecoration: "underline",
            }}
            onClick={() => window.open("/certificate/document", "_blank")}
          >
            {" "}
            Mã hoá công khai là gì {">>"}
          </button>
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
        <Tooltip
          followCursor
          title="Bạn vui lòng sao chép mã khoá công khai trước khi tiếp tục!"
        >
          <button
            style={{ alignSelf: "end" }}
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("/certificate/request");
            }}
          >
            Tiếp tục
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default CreateKey;
