import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import LoginPage from "@/app/login/page";
import { vi } from "vitest";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";

vi.mock("@/libs/auth/userAuth", () => ({
  useAuth: vi.fn(),
}));

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    push,
  }),
}));

describe("LoginPage", () => {
  it("should redirect me to the events list page when I am already logged in", () => {
    mockUseAuth({
      signIn: vi.fn(),
    });

    render(<LoginPage />);

    expect(push).toHaveBeenCalledWith("/events");
  });

  it("should show an inline error message when I submit an empty email or password field", async () => {
    mockUseAuth({
      signOut: vi.fn(),
    });

    render(<LoginPage />);

    const loginButton = screen.getByRole("button", {
      name: "Log in",
    });

    await userEvent.click(loginButton);

    await waitFor(() => {
      const emailErrorEl = screen.getByText("Enter your email address.");
      const passwordErrorEl = screen.getByText("Enter your password.");

      expect(emailErrorEl).toBeInTheDocument();
      expect(passwordErrorEl).toBeInTheDocument();
    });
  });

  it("should show an error when I submit the form with invalid credentials", async () => {
    const credentials = {
      email: "example@example.com",
      password: "incorrect password.",
    };
    mockUseAuth({
      signIn: vi.fn().mockReturnValue({
        data: {
          session: null,
          user: null,
        },
        error: "invalid_credentials",
      }),
    });

    render(<LoginPage />);

    const emailField = screen.getByLabelText("Email *");
    const passwordField = screen.getByLabelText("Password *");
    const loginButton = screen.getByRole("button", {
      name: "Log in",
    });

    await userEvent.type(emailField, credentials.email);
    await userEvent.type(passwordField, credentials.password);
    await userEvent.click(loginButton);

    await waitFor(() => {
      const invalidCredErr = screen.getByText("Invalid email or password.");

      expect(invalidCredErr).toBeInTheDocument();
    });
  });

  it("should redirect me to the Events List Page when I submit with a valid credentials", async () => {
    const credentials = {
      email: "example@example.com",
      password: "password",
    };
    mockUseAuth({
      signIn: vi.fn().mockReturnValue({
        data: {
          session: {},
          user: {},
        },
        error: null,
      }),
    });

    render(<LoginPage />);

    const emailField = screen.getByLabelText("Email *");
    const passwordField = screen.getByLabelText("Password *");
    const loginButton = screen.getByRole("button", {
      name: "Log in",
    });

    await userEvent.type(emailField, credentials.email);
    await userEvent.type(passwordField, credentials.password);
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/events");
    });
  });
});
