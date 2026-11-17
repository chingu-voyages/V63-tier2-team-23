import { HTMLAttributes, ReactNode } from "react";

type TextProps = HTMLAttributes<Element> & {
  children?: ReactNode;
};

export default function Text({ children, ...props }: TextProps) {
  return <span {...props}>{children}</span>;
}
