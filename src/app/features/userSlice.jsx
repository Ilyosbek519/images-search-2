import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload)); 
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
