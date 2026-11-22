import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";
import SignupPage from "@/app/signup/page";
vi.mock("@/libs/auth/useAuth");

const push = vi.fn();
vi.mock("next/router", () => ({
  useRouter: {
    push: push,
  },
}));

describe("Sign Up", () => {
  describe("Given I am already logged in", () => {
    it("should redirect me to the Events List Page", () => {
      const { session } = mockUseAuth();

      render(<SignupPage />);

      waitFor(() => {
        expect(push).toHaveBeenCalledExactlyOnceWith("/events");
      });
    });
  });
});
