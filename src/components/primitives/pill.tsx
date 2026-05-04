import Link from "next/link";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  href?: string;
  variant?: "default" | "solid";
  external?: boolean;
};

export function Pill({ children, href, variant = "default", external }: PillProps) {
  const cls = `pill ${variant === "solid" ? "pill-solid" : ""}`;
  const content = (
    <>
      {children}
      {variant === "solid" ? <span aria-hidden> →</span> : null}
    </>
  );
  if (!href) return <span className={cls}>{content}</span>;
  if (external) {
    return <a className={cls} href={href} target="_blank" rel="noreferrer">{content}</a>;
  }
  return <Link className={cls} href={href}>{content}</Link>;
}
