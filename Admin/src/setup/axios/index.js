import axios from "axios";
import store from "../redux/store";
import forge from "node-forge";
const instance = axios.create({
  baseURL: "http://localhost:8081",
});

const signData = (data, privateKey) => {
  const md = forge.md.sha256.create();
  md.update(data);
  const rawSignature = privateKey.sign(md);
  return forge.util.encode64(rawSignature);
};

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const key = state.signature.key;
  const timestamp = Date.now();
  let data = {};
  data = { timestamp, ...config.data };
  const signature = signData(data, key);
  if (!config.data) config.headers.timestamp = timestamp;
  config.headers.signature = signature;
  return config;
});

export default instance;
