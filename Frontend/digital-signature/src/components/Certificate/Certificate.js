import React from "react";
import forge from "node-forge";
import iconv from "iconv-lite";
import { Avatar, Typography } from "@mui/material";

const CertificateModal = ({ pemData, status }) => {
  let certificate;
  try {
    //   Parse the PEM data and extract the certificate details
    certificate = forge.pki.certificateFromPem(pemData);
  } catch (error) {}

  if (!certificate) {
    return (
      <Typography fontSize={17} id="modal-modal-title">
        File không hợp lệ. Vui lòng chọn đúng dịnh dạng file
      </Typography>
    );
  }

  const subject = certificate.serialNumber;
  console.log(JSON.stringify(certificate.subject));
  const value = certificate.subject.attributes.find(
    (attribute) => attribute.shortName === "CN"
  );
  const state = certificate.subject.attributes.find(
    (attribute) => attribute.shortName === "ST" || attribute.shortName === "S"
  );

  const country = certificate.subject.attributes.find(
    (attribute) => attribute.shortName === "C"
  );
  const utf8State = state ? iconv.decode(state?.value, "utf-8") : "";
  const utf8String = iconv.decode(value?.value, "utf-8");
  const issuer = certificate.issuer;

  const validFrom = new Date(certificate.validity.notBefore);
  const validTo = new Date(certificate.validity.notAfter);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const certificateFingerprint = forge.pki.getPublicKeyFingerprint(
    certificate.publicKey,
    {
      md: forge.md.sha256.create(),
      encoding: "hex",
    }
  );

  return (
    <div style={{ position: "relative" }}>
      <h5 className="als-left bold">Cấp cho: </h5>
      <p className="pl-5">Tên thường gọi (CN) : {utf8String}</p>
      {state && <p className="pl-5">Tỉnh (ST): {utf8State}</p>}

      <p className="pl-5">Quốc gia (C) : {country?.value}</p>

      <h5 className="als-left bold">Cấp bởi:</h5>
      <p className="pl-5">Tên thường gọi (CN) : {issuer.attributes[3].value}</p>
      <p className="pl-5">Đơn vị tổ chức (OU): {issuer.attributes[2].value}</p>
      <p className="pl-5">Tên tổ chức (O): {issuer.attributes[1].value}</p>
      <p className="pl-5">Quốc gia (C) : {issuer.attributes[0].value}</p>

      <div
        className="w-100"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h5 className="als-left bold">Thời gian có hiệu lực:</h5>
          <p className="pl-5">Cấp vào: {formatDate(validFrom)}</p>
          <p className="pl-5">Hết hạn vào: {formatDate(validTo)}</p>
        </div>
        <div style={{ alignSelf: "flex-end" }}>
          {status && (
            <>
              <h5 className="text-center bold">Trạng thái chứng chỉ:</h5>
              <p>{status}</p>
            </>
          )}
        </div>
      </div>

      <h5 className="als-left bold">Vân tay số SHA-256:</h5>
      <p className="pl-5" style={{ wordWrap: "break-word" }}>
        Serial Number: {subject}
      </p>
      <p className="pl-5" style={{ wordWrap: "break-word" }}>
        {" "}
        Khoá công khai: {certificateFingerprint}
      </p>

      {status && (
        <img
          style={{ position: "absolute", top: "0", right: "0", width: "30%" }}
          src={
            status === "Chứng chỉ hợp lệ ✅"
              ? "../../../static/img/certified.png"
              : "../../../static/img/not-certified.svg"
          }
        />
      )}
    </div>
  );
};

export default CertificateModal;
