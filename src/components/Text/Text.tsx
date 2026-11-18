import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";

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

type TextOwnProps = {
  variant?: TextVariant;
};

type TextProps = TextOwnProps & Omit<ComponentPropsWithoutRef<"span">, keyof TextOwnProps>;
/**
 * Renders text with a typography style from the design system.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `variant` | `"display"` \| `"title"` \| `"headline"` \| `"subheadline"` \| `"body"` \| `"label"` \| `"caption"` | The typography style (default: `"body"`) |
 * | `children` | `ReactNode` | The text content |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <Text variant="display">Event Planner</Text>
 * <Text variant="body">Some body text</Text>
 * <Text variant="label" as="label" htmlFor="email">Email</Text>
 * ```
 */
export default function Text({ children, variant = "body", className, ...props }: TextProps) {
  return (
    <span {...props} className={`${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
