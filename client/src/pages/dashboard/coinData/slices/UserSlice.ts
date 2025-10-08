import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coinsApi } from "../services/getApiCoins"; 
import { LoginResponse } from "../../types";

export interface UserState {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
  };
}
const storedUser = localStorage.getItem("userData");
const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : { success: false };

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.success = false;
      state.token = undefined;
      state.user = undefined;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(coinsApi.endpoints.login.matchFulfilled, (state, { payload }: PayloadAction<LoginResponse>) => {
      state.success = payload.success;
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem("userData", JSON.stringify(payload));
    });
  },
});

export const { logout } = UserSlice.actions;

