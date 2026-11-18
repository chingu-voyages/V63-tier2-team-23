"use client";
import { ComponentPropsWithoutRef } from "react";
import Text from "@/components/Text/Text";

const buttonTypeStyles = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-surface border-1 border-outline-variant text-primary",
  danger: "bg-error text-on-error",
  text: "bg-surface text-on-surface-variant",
};

type ButtonVariant = "primary" | "secondary" | "danger" | "text";

type ButtonOwnProps = {
  type: ButtonVariant;
};

type ButtonProps = ButtonOwnProps & Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps>;

export default function Button({ type, children, className, ...props }: ButtonProps) {
  return (
    <button className={`rounded-small p-3 ${buttonTypeStyles[type]} ${className}`} {...props}>
      <Text type="label">{children}</Text>
    </button>
  );
}
