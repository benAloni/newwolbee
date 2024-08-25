import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice"; // Make sure this import is correct

const reducer = {
  user: userSlice.reducer, // Access the 'reducer' property of the userSlice
};

 export const store = configureStore({
  reducer: reducer,
  devTools: true,
}); 

