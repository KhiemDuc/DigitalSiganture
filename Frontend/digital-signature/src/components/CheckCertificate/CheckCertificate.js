import React, { useEffect, useState } from "react";
import forge from "node-forge";
import iconv from "iconv-lite";
import CertificateModal from "../Certificate/Certificate";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import CertificateService from "../../services/certificate.service";
import { Card } from "@mui/material/Card";

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
        // const certPem = `-----BEGIN CERTIFICATE-----\n${e.target.result}\n-----END CERTIFICATE-----`;
        // const der = forge.util.decode64(e.target.result);
        // console.log(der);
        const asn1 = forge.asn1.fromDer(buffer);
        const cert = forge.pki.certificateFromAsn1(asn1);
        const pem = forge.pki.certificateToPem(cert);
        console.log(pem);
        const cert1 = forge.pki.certificateFromPem(pem);
        const value = cert1.subject.attributes[2].value;
        const utf8String = iconv.decode(value, "utf-8");
        setCertData(pem);
        console.log(utf8String);
        console.log("Issuer:", cert1.issuer.attributes);
        console.log("Serial Number:", cert1.serialNumber);
        const fingerprint = forge.pki.getPublicKeyFingerprint(cert1.publicKey, {
          md: forge.md.sha256.create(),
          encoding: "hex",
        });
        console.log("Public Key Fingerprint:", fingerprint);
        console.log(cert1);
      } catch (e) {
        isFalse = true;
      }
    };
    readerText.onload = (e) => {
      try {
        const cert1 = forge.pki.certificateFromPem(e.target.result);
        const value = cert1.subject.attributes[2].value;
        const utf8String = iconv.decode(value, "utf-8");
        console.log(utf8String);
        console.log("Issuer:", cert1.issuer.attributes);
        console.log("Serial Number:", cert1.serialNumber);
        const fingerprint = forge.pki.getPublicKeyFingerprint(cert1.publicKey, {
          md: forge.md.sha256.create(),
          encoding: "hex",
        });
        setCertData(e.target.result);
        console.log(e.target.result);
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
                setStatus("Chứng chỉ hợp lệ");
              })
              .catch((err) => {
                setStatus(
                  "Chứng chỉ không được cấp bởi CA này hoặc đã hết hạn"
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
                width: 900,
                bgcolor: "white",
                border: "1px solid #ccc",
                boxShadow: 24,
                p: 4,
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
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
