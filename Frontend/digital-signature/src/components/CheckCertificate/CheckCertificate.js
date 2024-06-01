import React, { useState } from "react";
import forge from "node-forge";
import CertificateModal from "../Certificate/Certificate";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import CertificateService from "../../services/certificate.service";

function CheckCertificate() {
  const [open, setOpen] = useState(false);
  const [certData, setCertData] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    if (!event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    const file2 = new File([file], file.name, { type: file.type });
    console.log(file2);
    const reader = new FileReader();
    const readerText = new FileReader();
    let isFalse = false;
    reader.onload = (e) => {
      try {
        const buffer = forge.util.createBuffer(e.target.result);
        const asn1 = forge.asn1.fromDer(buffer);
        const cert = forge.pki.certificateFromAsn1(asn1);
        const pem = forge.pki.certificateToPem(cert);
        setCertData(pem);
      } catch (e) {
        isFalse = true;
      }
    };
    readerText.onload = (e) => {
      try {
        setCertData(e.target.result);
      } catch (error) {
        console.log(error);
      }
    };

    readerText.readAsText(file2);
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Box>
        <div
          class="form-group"
          style={{
            padding: "10px",
          }}
        >
          <label htmlFor="exampleInputPassword1">
            Nhập file chứng chỉ số định dạng *cer, *crt
          </label>
          <input
            className="form-control"
            id="exampleInputPassword1"
            type="file"
            accept=".cer, .crt"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            CertificateService.checkCertificate(certData)
              .then((res) => {
                setStatus("Chứng chỉ hợp lệ ✅");
              })
              .catch((err) => {
                setStatus(
                  "Chứng chỉ không được cấp bởi chúng tôi hoặc đã hết hạn ❌"
                );
              });
            setOpen(true);
          }}
        >
          Kiểm tra
        </button>
        {certData != null && (
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxWidth: 900,
                bgcolor: "white",
                border: "2px solid #ccc",
                boxShadow: 24,
                p: 4,
                // borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                maxHeight: "92vh",
                overflow: "auto",
              }}
            >
              <CertificateModal
                pemData={certData}
                status={status}
                reason={message}
              />
              <IconButton
                aria-label="close"
                onClick={handleClose} // Replace 'handleClose' with your function to close the modal
                sx={{
                  position: "absolute", // Position the button absolutely
                  top: 0, // Position it at the top
                  right: 0, // Position it at the left
                  padding: 2,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
}

export default CheckCertificate;
