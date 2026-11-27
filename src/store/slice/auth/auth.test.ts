import { vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { authReducer } from "@/store/slice/auth";
import { makeStore } from "@/store";
import { logIn } from "@/store/slice/auth/actions";

vi.mock("@supabase/supabase-js");

const supabaseClient = {
  auth: {
    signInWithPassword: vi.fn(),
  },
} as unknown as SupabaseClient;

// beforeEach(() => {
//   vi.clearAllMocks();
// });

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
        user: {
          id: "11111111-1111-1111-1111-111111111111",
          aud: "authenticated",
          role: "authenticated",
          email: "example@email.com",
        },
        error: null,
      };

      vi.spyOn(supabaseClient.auth, "signInWithPassword").mockReturnValueOnce(
        Promise.resolve({
          data: {
            session: {},
            user: {
              id: "11111111-1111-1111-1111-111111111111",
              aud: "authenticated",
              role: "authenticated",
              email: "example@email.com",
            },
          },
          error: null,
        }),
      );

      await store.dispatch(logIn);

      expect(store.getState().auth).toEqual(expectedState);
    });
  });
});
