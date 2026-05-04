import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  variant?: "default" | "solid" | "warm";
  onClick?: () => void;
  active?: boolean;
};

export function Tag({ children, variant = "default", onClick, active }: TagProps) {
  const base =
    variant === "solid" ? "tag tag-solid" :
    variant === "warm"  ? "tag tag-warm"  :
    "tag";
  const cls = `${base} ${active ? "tag-solid" : ""}`;
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} style={{ cursor: "pointer" }}>
        {children}
      </button>
    );
  }
  return <span className={cls}>{children}</span>;
}
