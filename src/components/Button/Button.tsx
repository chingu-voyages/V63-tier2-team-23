import { HTMLAttributes } from "react";
import Text from "@/components/Text/Text";

const buttonTypeStyles = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-surface border-1 border-outline-variant text-primary",
  danger: "bg-error text-on-error",
  text: "bg-surface text-on-surface-variant",
};

type ButtonType = "primary" | "secondary" | "danger" | "text";
// type ButtonState = "default" | "loading";
// TODO: add support for button state later

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type: ButtonType;
  // state: ButtonState;
};

export default function Button({ type, children, className }: ButtonProps) {
  return (
    <Text
      variant="label"
      as="button"
      className={`rounded-small p-3 ${buttonTypeStyles[type]} ${className}`}
    >
      {children}
    </Text>
  );
}
