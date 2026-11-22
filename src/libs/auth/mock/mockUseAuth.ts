import { vi } from "vitest";
import { useAuth } from "../useAuth";
import type { AuthContextType } from "@/libs/auth/AuthProvider";

export function mockUseAuth(overrides: Partial<ReturnType<typeof useAuth>> = {}) {
  const value = {
    session: {
      access_token: "",
      refresh_token: "",
      expires_in: 0,
      token_type: "bearer",
      user: {
        id: "",
        app_metadata: {},
        user_metadata: {},
        aud: "",
        created_at: "",
      },
    },
    user: {
      id: "",
      app_metadata: {},
      user_metadata: {},
      aud: "",
      created_at: "",
    },
    loading: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
    ...overrides,
  } as AuthContextType;
  vi.mocked(useAuth).mockReturnValue(value);
  return value;
}
