import axios from "../setup/axios";
const getListRequests = (extend = false) => {
  return axios.get(`/ca/certificate`, {
    params: {
      extend: extend,
    },
  });
};
export { getListRequests };
