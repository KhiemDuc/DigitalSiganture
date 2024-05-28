import axios from "../setup/axios";
const getImg = (imgName) => {
  return axios.get("/ca/img/" + imgName);
};

export { getImg };
