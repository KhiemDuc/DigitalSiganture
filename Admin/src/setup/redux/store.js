import { configureStore } from "@reduxjs/toolkit";
import signature from "./signatureSlice";
export const store = configureStore({
  reducer: {
    signature,
  },
});
