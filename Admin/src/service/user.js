import axios from "../setup/axios";

const toggleLockUser = (id) => {
  return axios.patch(`/ca/user/${id}`);
};
export { toggleLockUser };
