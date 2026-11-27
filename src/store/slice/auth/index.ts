import { createSlice } from "@reduxjs/toolkit";
import type { AuthApiError, AuthUser as User } from "@supabase/supabase-js";
import { type RootState } from "@/store";

type AuthState = {
  user: User | null;
  error: AuthApiError["code"] | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const initialState: AuthState = {
  user: null,
  error: null,
  status: "unauthenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export default authSlice;

const authReducer = authSlice.reducer;
const authSelector = (state: RootState) => state.auth;

export { authReducer, authSelector };
//
