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

const uploadAvatar = (formData) => {
  return axios.post("access/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadBackground = (formData) => {
  return axios.post("access/background", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const UserService = {
  getUserInfo,
  searchUser,
  changeCurrentPasssword,
  uploadAvatar,
  uploadBackground,
};

export default UserService;
