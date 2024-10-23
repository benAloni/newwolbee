import { createSlice } from "@reduxjs/toolkit";

export const UNKNOWN_USER_STATE = 0;
const initialState = {
  user: UNKNOWN_USER_STATE,
};

//signInWithEmailAndPassword
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: action.payload.role,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    setLayout: (state, { payload }) => {
      state.layout = payload;
    },
    setToogleHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});

export const { authenticate, logout, setLoading, setLayout, setToogleHeader } =
  authSlice.actions;
export default authSlice.reducer;
