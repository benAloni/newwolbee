import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // isLoading: true,
  header: false,
};
//signInWithEmailAndPassword
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        role: action.payload.role,
        token: action.payload.token,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    setLayout: (state, { payload }) => {
      state.layout = payload;
    },
    setToogleHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});

export const { login, logout, setLoading, setLayout, setToogleHeader } =
  userSlice.actions;
export default userSlice.reducer;
