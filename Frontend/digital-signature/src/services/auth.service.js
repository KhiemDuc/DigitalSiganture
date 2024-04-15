import axios from "../setup/axios";

const signup = (
  email,
  userName,
  password,
  phoneNumber,
  firstName,
  lastName
) => {
  return axios.post("access/signup", {
    email,
    userName,
    password,
    phoneNumber,
    firstName,
    lastName,
  });
};

const verifyOtp = (otp, token) => {
  return axios
    .post(
      "access/signup/verify",
      {
        otp,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((response) => {
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};

const login = (userName, password) => {
  return axios
    .post("access/signin", {
      userName,
      password,
    })
    .then((response) => {
      console.log(response.data.data);
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post("access/logout").then((response) => {
    return response.data;
  });
};

const refreshToken = (refreshToken, id) => {
  return axios
    .post("/access/refresh-token", {
      headers: {
        "x-client-id": id,
        "refresh-token": refreshToken,
      },
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  verifyOtp,
  signup,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};

export default AuthService;
