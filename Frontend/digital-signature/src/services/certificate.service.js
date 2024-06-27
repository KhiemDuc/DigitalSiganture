import axios from "../setup/axios";

const checkCertificate = (certificatePem) => {
  return axios.post("certificate/check", { certificatePem });
};

const myRequest = () => {
  return axios.get("certificate/request");
};

const checkPublicKey = (publicKey) => {
  console.log(publicKey);
  return axios.post("certificate/check_key", { publicKey });
};

const verifyPublicKey = (message) => {
  return axios.post("certificate/verify", { message });
};

const getCertificate = () => {
  return axios.get("certificate/");
};

const extendCertificate = (publicKey) => {
  return axios.post("certificate/extend", { publicKey });
};

const deleteCertificate = (signature) => {
  return axios.delete(`certificate/`, {
    data: {
      signature,
    },
  });
};

const CertificateService = {
  checkCertificate,
  myRequest,
  getCertificate,
  extendCertificate,
  deleteCertificate,
  checkPublicKey,
  verifyPublicKey,
};

export default CertificateService;
