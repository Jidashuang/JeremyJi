import type { ReactNode } from "react";

type DownloadButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  download?: boolean;
};

export function DownloadButton({ href, children, variant = "solid", download = true }: DownloadButtonProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    border: "1px solid var(--ink)",
    borderRadius: "6px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: variant === "solid" ? "var(--ink)" : "transparent",
    color: variant === "solid" ? "var(--paper)" : "var(--ink)",
  };
  return (
    <a href={href} download={download} style={style}>
      {children}
    </a>
  );
}
