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
