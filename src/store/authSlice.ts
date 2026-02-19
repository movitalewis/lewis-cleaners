import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUser, saveUser, removeUser } from "../utils/storage";

type User = {
  name: string;
  token: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: getUser() // hydrate on app load
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      saveUser(action.payload); // persist
    },
    logout: (state) => {
      state.user = null;
      removeUser(); // clear
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
