import axios from "../setup/axios";
const getListRequests = (extend = false) => {
  return axios.get(`/ca/certificate/request`);
};
const signCertificate = (certPem, userId, isExtend) => {
  return axios.post(`/ca/certificate`, {
    certPem: certPem,
    userId: userId,
    isExtend,
  });
};

const rejectSign = (id, reason) => {
  return axios.patch(`/ca/certificate/${id}`, {
    reason,
  });
};
const deleteCert = (id) => {
  return axios.delete(`/ca/certificate/${id}`);
};
export { getListRequests, signCertificate, deleteCert, rejectSign };
