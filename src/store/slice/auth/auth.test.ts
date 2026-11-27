import { vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { authReducer } from "@/store/slice/auth";
import { makeStore } from "@/store";

vi.mock("@supabase/supabase-js");

const supabaseClient = createClient("", "");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Auth Slice", () => {
  const store = makeStore(supabaseClient);

  it("starts with an empty state", () => {
    expect(store.getState().auth).toEqual({
      status: "unauthenticated",
      user: null,
      error: null,
    });
  });
});
