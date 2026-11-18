import { ElementType, HTMLAttributes, ReactNode } from "react";
import Text, { TextVariant } from "@/components/Text/Text";

const feedBackStyle = {
  error: "bg-error-container! text-error!",
  success: "bg-success-container! text-success!",
  loading: "bg-surface-variant! text-on-surface-variant!",
};

export type FeedbackType = keyof typeof feedBackStyle;

export const feedbacktVariants = Object.keys(feedBackStyle) as FeedbackType[];

type FeedbackProps = HTMLAttributes<HTMLElement> & {
  type: FeedbackType;
  message: string;
};

/**
 * Displays a short feedback message with a style matching its type.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `type` | `"error"` \| `"success"` \| `"loading"` | The feedback variant |
 * | `message` | `string` | The text to display |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <Feedback type="error" message="Invalid email or password" />
 * <Feedback type="success" message="Changes saved" className="mt-4" />
 * <Feedback type="loading" message="Saving changes..." />
 * ```
 */
export default function Feedback({ type, message, className }: FeedbackProps) {
  return (
    <div className={`rounded rounded-small p-4 ${feedBackStyle[type]} ${className}`}>
      <Text as="label">{message}</Text>
    </div>
  );
}
