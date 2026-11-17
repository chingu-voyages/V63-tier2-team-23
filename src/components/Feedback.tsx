import { ElementType, HTMLAttributes, ReactNode } from "react";
import Text from "@/components/Text/Text";

const feedBackStyle = {
  error: "bg-error-container! text-error!",
  success: "bg-success-container! text-success!",
  loading: "bg-surface-variant! text-on-surface-variant!",
};

type FeedbackType = keyof typeof feedBackStyle;

type FeedbackProps = HTMLAttributes<HTMLElement> & {
  type: FeedbackType;
  message: string;
};

export default function Feedback({ type, message, className }: FeedbackProps) {
  return (
    <div className={`rounded rounded-small p-4 ${feedBackStyle[type]} ${className}`}>
      <Text as="label">{message}</Text>
    </div>
  );
}
