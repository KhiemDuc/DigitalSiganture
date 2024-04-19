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

const resendOtp = (token) => {
  return axios.get("access/resend-otp", {
    headers: {
      token,
    },
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

const acceptResetPassword = (id) => {
  return axios.get("access/reset/" + id);
};

const confirmOtpResetPassword = (token, otp) => {
  return axios.post(
    "access/confirm",
    {
      otp,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

const resetPassword = (token, newPassword) => {
  return axios.post(
    "access/new-pass",
    {
      newPassword,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  verifyOtp,
  resendOtp,
  acceptResetPassword,
  confirmOtpResetPassword,
  resetPassword,
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
