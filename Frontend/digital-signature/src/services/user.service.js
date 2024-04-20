import axios from "../setup/axios";

const getUserInfo = (id) => {
  return axios.get("access/" + id);
};

const searchUser = (search) => {
  return axios.get("access/find/" + search);
};

const changeCurrentPasssword = ({ password, newPassword }) => {
  return axios.post("access/change-password/", { password, newPassword });
};

const UserService = {
  getUserInfo,
  searchUser,
  changeCurrentPasssword,
};

export default UserService;
