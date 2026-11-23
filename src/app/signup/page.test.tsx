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

    const emailField = screen.getByLabelText("Email *");
    const passwordField = screen.getByLabelText("Password *");
    const confirmPasswordField = screen.getByLabelText("Confirm Password *");
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

  describe("Validation", () => {
    it("should show an inline error message when I submit with a password that is less than 8 characters", async () => {
      mockUseAuth();
      render(<SignupPage />);

      const emailField = screen.getByLabelText("Email *");
      const signUpButton = screen.getByRole("button", { name: /Sign up/ });

      await userEvent.type(emailField, "example@example.com");
      await userEvent.click(signUpButton);

      await waitFor(() => {
        const passwordErrorField = screen.getByText("Use at least 8 characters.");
        expect(passwordErrorField).toBeInTheDocument();
      });
    });

    it("should show an error message when I submit with password and confirm password not matching", async () => {
      mockUseAuth({
        signUp: vi.fn(),
      });
      render(<SignupPage />);

      const emailField = screen.getByLabelText("Email *");
      const passwordField = screen.getByLabelText("Password *");
      const confirmPasswordField = screen.getByLabelText("Confirm Password *");

      const signUpButton = screen.getByRole("button", { name: /Sign up/ });

      await userEvent.type(emailField, "example@example.com");
      await userEvent.type(passwordField, "password");
      await userEvent.type(confirmPasswordField, "random");
      await userEvent.click(signUpButton);

      await waitFor(() => {
        const confirmPasswordError = screen.getByText("Re-enter the same password.");
        expect(confirmPasswordError).toBeInTheDocument();
      });
    });

    it("should show an error if the email field is invalid", async () => {
      mockUseAuth({
        signUp: vi.fn(),
      });

      render(<SignupPage />);

      const emailField = screen.getByLabelText("Email *");
      const signUpButton = screen.getByRole("button", { name: /Sign up/ });

      await userEvent.type(emailField, "user@");
      await userEvent.click(signUpButton);

      await waitFor(() => {
        const emailError = screen.getByText("Enter a valid email address.");
        expect(emailError).toBeInTheDocument();
      });
    });

    it("should show an error message if I submit with an empty field", async () => {
      mockUseAuth({
        signUp: vi.fn(),
      });
      render(<SignupPage />);

      const signUpButton = screen.getByRole("button", { name: /Sign up/ });

      await userEvent.click(signUpButton);

      await waitFor(() => {
        const emailError = screen.getByText("Enter your email address");
        const passwordError = screen.getByText("Enter a password of at least 8 characters.");
        const confirmPasswordError = screen.getByText("Confirm your password.");

        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
        expect(confirmPasswordError).toBeInTheDocument();
      });
    });
  });
});
