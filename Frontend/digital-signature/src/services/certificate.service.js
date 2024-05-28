import axios from "../setup/axios";

const checkCertificate = (certificatePem) => {
  return axios.post("certificate/check", { certificatePem });
};

const myRequest = () => {
  return axios.get("certificate/request");
};

const getCertificate = () => {
  return axios.get("certificate/");
};

const CertificateService = {
  checkCertificate,
  myRequest,
  getCertificate,
};

export default CertificateService;
