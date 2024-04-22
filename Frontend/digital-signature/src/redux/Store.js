import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./message";
import infoReducer from "./infoSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  info: infoReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
