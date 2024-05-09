import axios from "../setup/axios";

const checkCertificate = (certificatePem) => {
  return axios.post("certificate/check", { certificatePem });
};

const CertificateService = {
  checkCertificate,
};

export default CertificateService;
