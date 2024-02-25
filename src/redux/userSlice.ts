import { User } from "@/types";
import type { RootState } from "./store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storageIsAuthorized = !!localStorage.getItem("isAuthorized") || false;
const storageToken = localStorage.getItem("token") || "";
const storageUserName = localStorage.getItem("userName") || "";

const initialState: User = {
  isAuthorized: storageIsAuthorized,
  token: storageToken,
  userName: storageUserName,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthorized: (
      state,
      action: PayloadAction<{ token: string; userName: string }>
    ) => {
      const { token, userName } = action.payload;
      state.isAuthorized = true;
      state.token = token;
      state.userName = userName;
      localStorage.setItem("isAuthorized", state.isAuthorized.toString());
      localStorage.setItem("token", state.token);
      localStorage.setItem("userName", state.userName);
    },
  },
});

export const { setIsAuthorized } = userSlice.actions;
export const userState = (state: RootState) => state.user;
export default userSlice.reducer;
