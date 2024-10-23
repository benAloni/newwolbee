import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";

const reducer = {
  auth: authSlice.reducer, // Access the 'reducer' property of the authSlice
};

 export const store = configureStore({
  reducer: reducer,
  devTools: true,
}); 

