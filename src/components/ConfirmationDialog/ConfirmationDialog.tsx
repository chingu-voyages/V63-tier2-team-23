"use client";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import { ComponentPropsWithoutRef } from "react";

type ConfirmationDialogOwnProps = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  kind: "create" | "edit" | "delete";
  onConfirmAction?: () => void;
  onCancelAction?: () => void;
};

type ConfirmationDialogProps = ComponentPropsWithoutRef<"div"> & ConfirmationDialogOwnProps;

/**
 * Displays a confirmation dialog with a title, message, and action buttons.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `title` | `string` | The dialog title |
 * | `message` | `string` | The dialog message |
 * | `confirmLabel` | `string` | The label for the confirm button |
 * | `cancelLabel` | `string` | The label for the cancel button |
 * | `kind` | `"create"` \| `"edit"` \| `"delete"` | The dialog kind (affects styling) |
 * | `onConfirmAction` | `() => void` | Callback when confirm is clicked |
 * | `onCancelAction` | `() => void` | Callback when cancel is clicked |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <ConfirmationDialog kind="delete" title="Delete event" message="Are you sure?" confirmLabel="Delete" cancelLabel="Cancel" onConfirmAction={() => handleDelete()} onCancelAction={() => handleClose()} />
 * <ConfirmationDialog kind="create" title="Create event" message="Proceed with creation?" confirmLabel="Create" cancelLabel="Cancel" onConfirmAction={() => handleCreate()} />
 * ```
 */
export default function ConfirmationDialog({
  title,
  message,
  kind,
  confirmLabel,
  cancelLabel,
  onConfirmAction,
  onCancelAction,
  className,
  ...props
}: ConfirmationDialogProps) {
  return (
    <div
      className={`${kind === "create" ? "border" : "border-0"} inline-flex flex-col gap-4 rounded-large p-6 shadow-dialog ${className}`}
      {...props}
    >
      <Text type="headline" className="text-on-surface">
        {title}
      </Text>
      <Text className="text-on-surface-variant">{message}</Text>
      <Button type={kind === "delete" ? "danger" : "primary"} onClick={onConfirmAction}>
        {confirmLabel}
      </Button>
      <Button type="secondary" onClick={onCancelAction}>
        {cancelLabel}
      </Button>
    </div>
  );
}
