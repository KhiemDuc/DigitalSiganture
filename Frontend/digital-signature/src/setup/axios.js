import axios from "axios";
import { store } from "../redux/Store";
import { useRef } from "react";
import { refreshToken } from "../redux/authSlice";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // timeout: 5000,
});

// const navigate = useNavigate();
console.log(process.env.REACT_APP_API_URL);

instance.interceptors.request.use(
  (config) => {
    // const user = JSON.parse(localStorage.getItem("user"));
    const { user } = store.getState().auth;
    console.log(user);
    if (user) {
      config.headers["authentication"] = user.accessToken;
      config.headers["x-client-id"] = user._id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      try {
        const { user } = store.getState().auth;
        const result = instance.post("/auth/refresh_token", {
          headers: {
            "refresh-token": user.refreshToken,
            "x-client-id": user._id,
          },
        });
        store.dispatch(refreshToken(result.data.data));
        return instance(originalConfig);
      } catch (err) {
        if (err) {
          window.location.href = "/";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
