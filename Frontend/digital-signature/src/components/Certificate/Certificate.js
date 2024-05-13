import React, { useState } from "react";
import forge from "node-forge";
import iconv from "iconv-lite";

import Box from "@mui/material/Box";

const CertificateModal = ({ pemData, status }) => {
  console.log(pemData);
  //   Parse the PEM data and extract the certificate details
  const certificate = forge.pki.certificateFromPem(pemData);
  const subject = certificate.serialNumber;

  const value = certificate.subject.attributes[2].value;
  const state = certificate.subject.attributes[1].value;
  const utf8State = iconv.decode(state, "utf-8");
  const utf8String = iconv.decode(value, "utf-8");
  const issuer = certificate.issuer;
  console.log(issuer);
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
      <h3>Cấp cho</h3>
      <p>Tên thường gọi (CN) : {utf8String}</p>
      <p>Tỉnh (S): {utf8State}</p>
      <p>Quốc gia (C) : {certificate.subject.attributes[0].value}</p>

      <h2>Cấp bởi:</h2>
      <p>Tên thường gọi (CN) : {issuer.attributes[3].value}</p>
      <p>Đơn vị tổ chức (OU): {issuer.attributes[2].value}</p>
      <p>Tên tổ chức (S): {issuer.attributes[1].value}</p>
      <p>Quốc gia (C) : {issuer.attributes[0].value}</p>

      <h2>Thời gian có hiệu lực:</h2>
      <p>Cấp vào: {formatDate(validFrom)}</p>
      <p>Hết hạn vào: {formatDate(validTo)}</p>

      <p>Vân tay số SHA-256:</p>
      <p>Serial Number: {subject}</p>
      <p>Khoá công khai: {certificateFingerprint}</p>
    </>
  );
};

export default CertificateModal;
