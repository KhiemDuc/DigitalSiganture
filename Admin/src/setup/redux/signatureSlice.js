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
const { reducer, actions } = slice;

export const { setState } = actions;
export default reducer;
