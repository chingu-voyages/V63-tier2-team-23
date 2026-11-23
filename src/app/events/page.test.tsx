import EventListPage from "@/app/events/page";
import { mockUseAuth } from "@/libs/auth/mock/mockUseAuth";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    push,
  }),
}));

vi.mock("@/libs/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("EventListPage", () => {
  describe("signOut", () => {
    it("should redirect the me to the login page after signOut is successful", async () => {
      mockUseAuth({
        signOut: vi.fn(),
      });

      render(<EventListPage />);

      const logOutButton = screen.getByRole("button", { name: "Log out" });
      await userEvent.click(logOutButton);

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith("/login");
      });
    });
  });
});
