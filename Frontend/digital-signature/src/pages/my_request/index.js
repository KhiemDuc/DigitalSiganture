import Layout from "../../components/Layout";
import RequestTicket from "../../components/RequestSignature/RequestTicket";
import CertificateService from "../../services/certificate.service";
import { ToastContainer } from "react-toastify";
import { showToast, ToastType } from "../../common/toast";
import { saveAs } from "file-saver";
import forge from "node-forge";
import { useEffect } from "react";

export default function MyRequest() {
  useEffect(() => {
    document.title = "Vé yêu cầu";
    let element = document.querySelector(".fda3723591e0b38e7e52");

    if (element) {
      element.remove();
    }
  }, []);
  const handleClick = () => {
    CertificateService.getCertificate()
      .then((response) => {
        downloadCert(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        showToast(error.response.data.reason, ToastType.ERROR);
      });
  };
  const downloadCert = (pem) => {
    const fileName = "cert.crt";
    const certificate = forge.pki.certificateFromPem(pem);

    const der = forge.asn1
      .toDer(forge.pki.certificateToAsn1(certificate))
      .getBytes();

    const blob = new Blob(
      [new Uint8Array(der.split("").map((c) => c.charCodeAt(0)))],
      {
        type: "application/x-x509-ca-cert",
        // charset: "utf8",
      }
    );
    saveAs(blob, fileName);
  };
  return (
    <Layout
      heading={"Xem vé yêu cầu"}
      subheading={"Danh sách vé yêu cầu của bạn"}
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
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          handleClick();
        }}
        style={{
          alignSelf: "flex-end",
        }}
      >
        Tải chứng chỉ của bạn
      </button>
      <RequestTicket></RequestTicket>
    </Layout>
  );
}
