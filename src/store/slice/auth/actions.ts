import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkExtras } from "@/store";
import type { AuthUser as User, AuthApiError } from "@supabase/supabase-js";

type Credentials = {
  email: string;
  password: string;
};

// const { setAuthStatus } = authSlice.actions;

type LoginThunkExtra = ThunkExtras & {
  rejectValue: AuthApiError["code"];
};

export const logIn = createAsyncThunk<User, Credentials, LoginThunkExtra>(
  "auth/login",
  async (
    { email, password },
    {
      extra: {
        supabaseClient: { auth },
      },
      fulfillWithValue,
      rejectWithValue,
    },
  ) => {
    const response = await auth.signInWithPassword({ email, password });

    if (response.error) {
      return rejectWithValue(response.error.code);
    }

    return fulfillWithValue(response.data.user);
  },
);
