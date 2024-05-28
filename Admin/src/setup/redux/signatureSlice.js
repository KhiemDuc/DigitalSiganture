import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cert: null,
  key: null,
};

const slice = createSlice({
  name: "signature",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.cert = action.payload.cert;
      state.key = action.payload.key;
    },
  },
});

export const { setState } = slice.actions;
export default slice.reducer;
