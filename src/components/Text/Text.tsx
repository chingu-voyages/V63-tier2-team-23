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

export type Variant = keyof typeof variantStyles;

type TextProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  as?: ElementType;
  variant?: Variant;
};

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
