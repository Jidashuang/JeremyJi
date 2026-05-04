import type { ReactNode } from "react";

type PullQuoteProps = {
  children: ReactNode;
  cite?: string;
};

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      {children}
      {cite ? (
        <footer
          style={{
            fontFamily: "var(--font-mono)",
            fontStyle: "normal",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginTop: "12px",
          }}
        >
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  );
}
