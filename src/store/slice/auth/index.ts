import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthApiError, AuthUser as User } from "@supabase/supabase-js";
import { type RootState } from "@/store";
import { logIn } from "@/store/slice/auth/actions";

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
      })
      .addCase(logIn.fulfilled, (state, action) => {
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
