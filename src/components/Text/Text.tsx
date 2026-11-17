import { HTMLAttributes, ReactNode } from "react";

type TextProps = HTMLAttributes<Element> & {
  children?: ReactNode;
  as: string;
};

export default function Text({ children, as: Tag, ...props }: TextProps) {
  return <Tag {...props}>{children}</Tag>;
}
