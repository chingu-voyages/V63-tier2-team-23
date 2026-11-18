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
 * Renders text with a typography style from the design system.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `variant` | `"display"` \| `"title"` \| `"headline"` \| `"subheadline"` \| `"body"` \| `"label"` \| `"caption"` | The typography style (default: `"body"`) |
 * | `as` | `ElementType` | The HTML tag to render as (default: `"span"`) |
 * | `children` | `ReactNode` | The text content |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <Text variant="display" as="h1">Event Planner</Text>
 * <Text variant="body">Some body text</Text>
 * <Text variant="label" as="label" htmlFor="email">Email</Text>
 * ```
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
