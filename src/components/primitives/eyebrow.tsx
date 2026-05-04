import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
};

export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return <Tag className={`eyebrow ${className ?? ""}`}>{children}</Tag>;
}
