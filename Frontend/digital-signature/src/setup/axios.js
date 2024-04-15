import axios from "axios";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../redux/authSlice";
import { clearMessage } from "../../redux/message";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
});

const navigate = useNavigate();
const dispatch = useDispatch();

instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (token) {
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
          navigate("/");
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
