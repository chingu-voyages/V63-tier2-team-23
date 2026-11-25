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
  });
});
