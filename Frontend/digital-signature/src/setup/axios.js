import axios from "axios";
import AuthService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { refreshToken } from "../redux/authSlice";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

// const navigate = useNavigate();

instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
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
    if (error.response && error.response.status === 419) {
      try {
        const dispatch = useDispatch();
        const user = AuthService.getCurrentUser();
        dispatch(
          refreshToken({ refreshToken: user.refreshToken, id: user._id })
        )
          .unwrap()
          .then((result) => {
            console.log(result);
            originalConfig.headers["authentication"] = result.accessToken;
            originalConfig.headers["x-client-id"] = result._id;
          });

        return instance(originalConfig);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          window.location.href = "/";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
