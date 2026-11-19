import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("renders the app name", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: "Event Planner" })).toBeInTheDocument();
});
