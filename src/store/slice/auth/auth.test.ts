import { vi } from "vitest";
import {
  type SupabaseClient,
  type AuthUser as User,
  AuthSession as Session,
  AuthApiError,
} from "@supabase/supabase-js";
import { makeStore } from "@/store";
import { logIn, signUp } from "@/store/slice/auth/actions";

const supabaseClient = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
} as unknown as SupabaseClient;

const mockUser: User = {
  id: "11111111-1111-1111-1111-111111111111",
  aud: "authenticated",
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: {},
  created_at: "2026-01-01T00:00:00Z",
  email: "example@email.com",
};

const mockSession: Session = {
  access_token: "test-access-token",
  refresh_token: "test-refresh-token",
  expires_in: 3600,
  token_type: "bearer",
  user: mockUser,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Auth Slice", () => {
  let store: ReturnType<typeof makeStore>;

  beforeAll(() => {
    store = makeStore(supabaseClient);
  });

  it("starts with an empty state", () => {
    expect(store.getState().auth).toEqual({
      status: "unauthenticated",
      user: null,
      error: null,
    });
  });

  describe("Login", () => {
    it("sets the auth status to authenticated, stores the returned user, and leaves error as null when login succeeds", async () => {
      const expectedState = {
        status: "authenticated",
        user: mockUser,
        error: null,
      };

      vi.spyOn(supabaseClient.auth, "signInWithPassword").mockReturnValueOnce(
        Promise.resolve({
          data: {
            session: mockSession,
            user: mockUser,
          },
          error: null,
        }),
      );

      await store.dispatch(
        logIn({
          email: "example@email.com",
          password: "password",
        }),
      );

      expect(store.getState().auth).toEqual(expectedState);
    });

    it("sets the error message and status to unauthenticated and user field null when login is not successful", async () => {
      const expectedState = {
        status: "unauthenticated",
        user: null,
        error: "invalid_credentials",
      };

      vi.spyOn(supabaseClient.auth, "signInWithPassword").mockReturnValueOnce(
        Promise.resolve({
          data: {
            session: null,
            user: null,
          },
          error: new AuthApiError("Invalid login credentials", 400, "invalid_credentials"),
        }),
      );

      await store.dispatch(
        logIn({
          email: "example.com",
          password: "password",
        }),
      );

      expect(store.getState().auth).toEqual(expectedState);
    });
  });

  describe("SignUp", () => {
    it("sets the auth state to authenticated and stores the returned user when sign up is successful", async () => {
      const expectedState = {
        status: "authenticated",
        user: mockUser,
        error: null,
      };

      vi.spyOn(supabaseClient.auth, "signUp").mockReturnValueOnce(
        Promise.resolve({
          data: {
            session: mockSession,
            user: mockUser,
          },
          error: null,
        }),
      );

      await store.dispatch(
        signUp({
          email: "example.com",
          password: "password",
        }),
      );

      expect(store.getState().auth).toEqual(expectedState);
    });
  });

  describe("Logout", () => {
    it("resets auth slice to its initial state when logout succeeds", async () => {
      const expectedState = {
        status: "unauthenticated",
        user: null,
        error: null,
      };

      vi.spyOn(supabaseClient.auth, "signOut").mockReturnValueOnce(
        Promise.resolve({ error: null }),
      );

      await store.dispatch(logOut());
      expect(store.getState().auth).toEqual(expectedState);
    });
  });
});
