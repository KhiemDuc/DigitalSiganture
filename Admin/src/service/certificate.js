import axios from "../setup/axios";
const getListRequests = () => {
  return axios.get("/ca/certificate");
};
export { getListRequests };
