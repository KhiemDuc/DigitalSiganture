import axios from "../setup/axios";

const getUserInfo = (id) => {
  return axios.get("access/" + id);
};

const searchUser = (search) => {
  return axios.get("access/find/" + search);
};

const UserService = {
  getUserInfo,
  searchUser,
};

export default UserService;
