import axios from "../setup/axios";
const getListRequests = (extend = false) => {
  return axios.get(`/ca/certificate/request`, {
    params: {
      extend: extend,
    },
  });
};
const signCertificate = (certPem, userId) => {
  return axios.post(`/ca/certificate`, {
    certPem: certPem,
    userId: userId,
  });
};
export { getListRequests, signCertificate };
