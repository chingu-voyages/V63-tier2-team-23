import { HTMLAttributes, ReactNode, ElementType } from "react";

const variantStyles = {
  display: "text-display! font-sans!",
  title: "text-title! font-sans!",
  headline: "text-headline! font-sans!",
  subheadline: "text-subheadline! font-sans2!",
  body: "text-body! font-sans2!",
  label: "text-label! font-sans2!",
  caption: "text-caption! font-sans2!",
};

export type TextVariant = keyof typeof variantStyles;
export const textVariants = Object.keys(variantStyles) as TextVariant[];

type TextProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  as?: ElementType;
  variant?: TextVariant;
};

/**
 * Renders a Text component
 *
 * Use `variant` to pick the Text style and `as` to pick the HTML Element the text will be rendered as
 *
 * **Example**
 *
 * <code><pre><Text variant="display" as="h1">Event Planner</Text></pre></code>
 */
export default function Text({
  children,
  variant = "body",
  as: Tag = "span",
  className,
  ...props
}: TextProps) {
  return (
    <Tag {...props} className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
