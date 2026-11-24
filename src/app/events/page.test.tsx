import EventListPage from "@/app/events/page";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    push,
  }),
}));

vi.mock("@/libs/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("EventListPage", () => {
  beforeEach(() => {
    push.mockClear();
  });

  describe("signOut", () => {
    it("should call signOut and redirect to the login page after successful signOut", async () => {
      const signOut = vi.fn().mockResolvedValue({ error: null });

      mockUseAuth({ signOut });

      const user = userEvent.setup();
      render(<EventListPage />);

      const logOutButton = screen.getByRole("button", {
        name: "Log out",
      });

      await user.click(logOutButton);

      await waitFor(() => {
        expect(signOut).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith("/login");
      });
    });

    it("should display an error and not redirect when signOut fails", async () => {
      const signOut = vi.fn().mockResolvedValue({
        error: "some_error",
      });

      mockUseAuth({ signOut });

      const user = userEvent.setup();
      render(<EventListPage />);

      const logOutButton = screen.getByRole("button", {
        name: "Log out",
      });

      await user.click(logOutButton);

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Unable to log out. Please try again.",
      );

      expect(signOut).toHaveBeenCalledTimes(1);
      expect(push).not.toHaveBeenCalled();
    });
  });
});
