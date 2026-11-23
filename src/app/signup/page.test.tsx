import SignupPage from "@/app/signup/page";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";
import { render, waitFor, screen } from "@testing-library/react";
import { vi } from "vitest";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/libs/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("Sign Up", () => {
  describe("When I am already logged in", () => {
    it("should redirect me to the Events List Page", async () => {
      mockUseAuth();
      push.mockClear();
      render(<SignupPage />);

      expect(push).toHaveBeenCalledExactlyOnceWith("/events");
    });
  });
});
