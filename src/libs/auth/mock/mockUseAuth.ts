import { vi } from "vitest";
import { useAuth } from "../useAuth";
import type { AuthContextType } from "@/libs/auth/AuthProvider";

export function mockUseAuth(overrides: Partial<ReturnType<typeof useAuth>> = {}) {
  const value = {
    session: null,
    user: null,
    loading: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
    ...overrides,
  } as AuthContextType;
  vi.mocked(useAuth).mockReturnValue(value);
  return value;
}
