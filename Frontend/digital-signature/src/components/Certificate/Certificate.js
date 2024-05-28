import React, { useState } from "react";
import forge from "node-forge";
import iconv from "iconv-lite";

import Box from "@mui/material/Box";

const CertificateModal = ({ pemData, status, reason }) => {
  console.log(pemData);
  //   Parse the PEM data and extract the certificate details
  const certificate = forge.pki.certificateFromPem(pemData);
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
  const test = certificate.extensions;
  console.log(test);

  console.log(validFrom);
  console.log(validTo);

  return (
    <>
      <h3 className="als-left">Cấp cho: </h3>
      <p className="pl-5">Tên thường gọi (CN) : {utf8String}</p>
      {state && <p className="pl-5">Tỉnh (ST): {utf8State}</p>}

      <p className="pl-5">Quốc gia (C) : {country?.value}</p>

      <h3 className="als-left">Cấp bởi:</h3>
      <p className="pl-5">Tên thường gọi (CN) : {issuer.attributes[3].value}</p>
      <p className="pl-5">Đơn vị tổ chức (OU): {issuer.attributes[2].value}</p>
      <p className="pl-5">Tên tổ chức (O): {issuer.attributes[1].value}</p>
      <p className="pl-5">Quốc gia (C) : {issuer.attributes[0].value}</p>

      <h3 className="als-left">Thời gian có hiệu lực:</h3>
      <p className="pl-5">Cấp vào: {formatDate(validFrom)}</p>
      <p className="pl-5">Hết hạn vào: {formatDate(validTo)}</p>

      <h3>Vân tay số SHA-256:</h3>
      <p className="pl-5">Serial Number: {subject}</p>
      <p className="pl-5">Khoá công khai: {certificateFingerprint}</p>

      {status && (
        <>
          <h3 className="als-left">Trạng thái chứng chỉ:</h3>
          <p className="pl-5">{status}</p>
        </>
      )}
      {reason && (
        <>
          <h3 className="als-left">Trạng thái chứng chỉ:</h3>
          <p className="pl-5">{reason}</p>
        </>
      )}
    </>
  );
};

export default CertificateModal;
