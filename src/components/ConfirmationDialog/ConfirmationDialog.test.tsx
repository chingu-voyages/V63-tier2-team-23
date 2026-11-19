import { render, screen } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  it("calls onConfirm when the confirm button is clicked", () => {
    const onConfirmAction = vi.fn();

    render(
      <ConfirmationDialog
        title="Test"
        message=""
        cancelLabel=""
        confirmLabel="Confirm"
        onConfirmAction={onConfirmAction}
        kind="create"
      />,
    );

    screen.getByText(/Confirm/).click();

    expect(onConfirmAction).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when the cancel button is clicked", () => {
    const onCancelAction = vi.fn();

    render(
      <ConfirmationDialog
        title="Test"
        message=""
        cancelLabel="Cancel"
        confirmLabel="Confirm"
        onCancelAction={onCancelAction}
        kind="create"
      />,
    );

    screen.getByText(/Cancel/).click();

    expect(onCancelAction).toHaveBeenCalledTimes(1);
  });
});
