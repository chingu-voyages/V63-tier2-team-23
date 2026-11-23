import SignupPage from "@/app/signup/page";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";
import { render, waitFor, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

  it("should an inline error message when I sign up with an existing email", async () => {
    const credentials = {
      email: "example@example.com",
      password: "password",
    };
    mockUseAuth({
      signUp: vi.fn().mockReturnValue({
        data: {
          session: null,
          user: null,
        },
        error: "user_already_exists",
      }),
    });

    render(<SignupPage />);

    const emailField = screen.getByLabelText(/Email/);
    const passwordField = screen.getByLabelText(/Password/);
    const confirmPasswordField = screen.getByLabelText(/Confirm password/);
    const signUpButton = screen.getByRole("button", { name: /Sign up/ });

    await userEvent.type(emailField, credentials.email);
    await userEvent.type(passwordField, credentials.password);
    await userEvent.type(confirmPasswordField, credentials.password);
    await userEvent.click(signUpButton);

    await waitFor(() => {
      const emailExists = screen.getByText(/An account with this email already exists./);
      expect(emailExists).toBeInTheDocument();
    });
  });
});
