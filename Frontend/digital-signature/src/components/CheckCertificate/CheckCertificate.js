import React, { useEffect, useState } from "react";
import forge from "node-forge";
import iconv from "iconv-lite";
import Data from "./../ShowUserInfo/Data";
import { red } from "@mui/material/colors";

function CheckCertificate() {
  const [certData, setCertData] = useState(null);

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
    <form>
      <div
        class="form-group"
        style={{
          padding: "10px",
        }}
      >
        <label for="exampleInputPassword1">
          Nhập file chứng chỉ số định dạng *cer, *crt
        </label>
        <input
          class="form-control"
          id="exampleInputPassword1"
          type="file"
          accept=".cer, .crt"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Kiểm tra
      </button>
    </form>
  );
}

export default CheckCertificate;
