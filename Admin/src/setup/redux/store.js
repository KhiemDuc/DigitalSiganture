import { configureStore } from "@reduxjs/toolkit";
import sign from "./signatureSlice";
export default configureStore({
  reducer: {
    signature: sign,
  },
});
