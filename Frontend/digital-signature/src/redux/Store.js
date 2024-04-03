import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers";

export const Store = configureStore({
  reducer: rootReducer,
});
