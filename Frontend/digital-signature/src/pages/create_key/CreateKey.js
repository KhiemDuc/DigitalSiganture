import forge from "node-forge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";
import StepperCustom from "../../components/Steper";
import BackHome from "./../../components/BackHome";
import { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { saveAs } from "file-saver";
import CircularProgress from "@mui/material/CircularProgress";
import payment from "../../services/payment.service";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CertificateService from "../../services/certificate.service";
import InfoIcon from "@mui/icons-material/Info";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "1rem",
  pt: 2,
  px: 4,
  pb: 3,
};

const CreateKey = () => {
  const [isVerifiedFail, setIsVerifiedFail] = useState(false);
  const handleVerifyPublicKey = (message) => {
    CertificateService.verifyPublicKey(message)
      .then((res) => {
        navigate("/certificate/request/", { state: { publicKey } });
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  const [decryptMessage, setDecryptMessage] = useState("");
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      // Check if the file is a .pem file
      if (file.name.endsWith(".pem")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const privateKey = e.target.result;
          // Process the private key here
          setDecryptMessage(decryptWithPrivateKey(privateKey, encryptMessage));
        };

        reader.onerror = (e) => {
          console.error("Error reading file", e);
        };

        reader.readAsText(file); // Read the file content as text
      } else {
        alert("Please select a .pem file.");
      }
    }
  };

  function decryptWithPrivateKey(privateKeyPem, encryptedMessage) {
    let decryptedMessage = "";
    try {
      // Convert the PEM-formatted private key to a Forge private key object
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      // Assuming the encrypted message is Base64 encoded
      const encryptedBytes = forge.util.decode64(encryptedMessage);

      // Decrypt the message
      const decryptedBytes = privateKey.decrypt(encryptedBytes);

      // Convert decrypted bytes to a string
      decryptedMessage = forge.util.decodeUtf8(decryptedBytes);
    } catch (err) {
      setMessage("Khoá bí mật không hợp lệ! Vui lòng thử lại!");
    }
    return decryptedMessage;
  }

  const [showFullMessage, setShowFullMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [encryptMessage, setEncryptMessage] = useState("");
  const handleCheckPublicKey = (publicKey) => {
    if (publicKey === "") {
      return;
    }
    console.log(publicKey);
    CertificateService.checkPublicKey(publicKey)
      .then((res) => {
        setToken(res.data.data.token);
        setEncryptMessage(res.data.data.encryptedMessage);
        console.log(res.data.data.encryptedMessage);
      })
      .catch((err) => setMessage(err.response.data.message));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const [modulusLength, setModulusLength] = useState(2048);
  useEffect(() => {
    document.title = "Tạo cặp khoá - Hệ thống chữ ký số";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const generateKeyPair = async () => {
    setPublicKey("");
    setPrivateKey("");
    setMessage("");
    setDecryptMessage("");
    setEncryptMessage("");
    setToken("");
    setMessage("");
    // const url = new URL("http://localhost:3000/");
    // const worker = new Worker(`/certificate/miller.worker.js`);
    // console.log(worker);
    // worker.terminate();
    setIsLoading(true);
    const promise = new Promise((resolve, reject) => {
      forge.pki.rsa.generateKeyPair(
        {
          bits: modulusLength,
          e: 0x10001,
        },
        (err, keyPair) => {
          if (err) return reject(err);
          return resolve(keyPair);
        }
      );
    });

    try {
      const { privateKey, publicKey } = await promise;
      const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
      setPrivateKey(privateKeyPem);
      setPublicKey(publicKeyPem);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    // Convert keys to PEM format
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
              handleOpen();
            }}
          >
            Tiếp tục
          </button>
        </Tooltip>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 id="child-modal-title">Xác thực khoá công khai</h2>
          {!encryptMessage ? (
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Khoá công khai:{" "}
              </p>
              <textarea
                className="w-100 px-4 "
                style={{
                  height: "120px",
                  outline: "none",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                onChange={(e) => setPublicKey(e.target.value)}
                value={publicKey}
              ></textarea>
              <p style={{ color: "red" }}>{message}</p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span>
                <h5
                  style={{
                    margin: 0,
                  }}
                >
                  Chuỗi mã hoá:
                </h5>
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {encryptMessage.length > 200 && !showFullMessage
                    ? encryptMessage.slice(0, 200) + "..."
                    : encryptMessage}
                </p>
                {encryptMessage.length > 200 && (
                  <a
                    href="#"
                    onClick={() => setShowFullMessage(!showFullMessage)}
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {showFullMessage ? "Thu gọn" : "Xem thêm"}
                  </a>
                )}
              </span>
              {decryptMessage && (
                <span>
                  <h5>Chuỗi giải mã</h5>
                  <p>{decryptMessage}</p>
                </span>
              )}
              <div class="input-group">
                <div class="custom-file">
                  <label class="custom-file-label" for="inputGroupFile04">
                    Chọn file khoá bí mật để giải mã và xác thực
                  </label>
                  <Tooltip title="Chúng tôi chỉ dùng khoá bí mật của bạn để giải mã thông điệp chứ không lưu trữ hoặc sử dụng cho bất kỳ mục đích nào khác">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <input
                    type="file"
                    id="inputGroupFile04"
                    accept=".pem"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
              <p style={{ color: "red" }}>{message}</p>
            </div>
          )}

          <Button
            variant="outlined"
            style={{
              marginTop: "15px",
              alignSelf: "left",
            }}
            onClick={() => {
              if (decryptMessage) {
                handleVerifyPublicKey(decryptMessage);
              } else if (publicKey && !isVerifiedFail) {
                handleCheckPublicKey(publicKey);
              }
            }}
          >
            Gửi xác thực
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateKey;
