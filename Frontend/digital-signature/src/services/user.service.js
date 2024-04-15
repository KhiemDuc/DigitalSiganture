import axios from "../setup/axios";

const getUserInfo = (id) => {
  return axios.get("access/user/" + id);
};

const UserService = {
  getUserInfo,
};

export default UserService;
