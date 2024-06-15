import axios from "axios";
import { store } from "../redux/Store";
import { refreshToken } from "../redux/authSlice";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/",
  // timeout: 5000,
});

// const navigate = useNavigate();

instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
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

let isRefreshing = false;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.data.reason === "Token expired" && !isRefreshing) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const result = await instance.get("/access/refresh-token", {
          headers: {
            "refresh-token": user.refreshToken,
            "x-client-id": user._id,
          },
        });
        console.log(result.data.data);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        originalConfig.headers["authentication"] = result.data.data.accessToken;
        originalConfig.headers["x-client-id"] = result.data.data._id;
        store.dispatch(refreshToken(result.data.data));
        isRefreshing = true;
        return instance(originalConfig);
      } catch (err) {
        console.log(err.response);
        if (err.response) {
          console.log(err.response.data);
          localStorage.removeItem("user");
          window.location.href = "/";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
