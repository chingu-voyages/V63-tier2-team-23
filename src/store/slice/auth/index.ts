import { createSlice } from "@reduxjs/toolkit";
import type { AuthApiError, AuthUser as User } from "@supabase/supabase-js";
import { type RootState } from "@/store";
import { logIn, signUp } from "@/store/slice/auth/actions";

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

type AuthState = {
  user: User | null;
  error: AuthApiError["code"] | null;
  status: AuthStatus;
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
  extraReducers(builder) {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
        state.user = null;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.user = null;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.user = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
        state.error = null;
      });
  },
});

export default authSlice;

const authReducer = authSlice.reducer;
const authSelector = (state: RootState) => state.auth;

export { authReducer, authSelector };
//
