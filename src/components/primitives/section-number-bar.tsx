type SectionNumberBarProps = {
  number: string;        // e.g. "01"
  label: string;         // e.g. "My Operating System"
  trailing?: string;     // optional right-aligned em text, e.g. "How I observe, decide, execute"
};

export function SectionNumberBar({ number, label, trailing }: SectionNumberBarProps) {
  return (
    <div
      className="snb"
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "16px",
        borderTop: "1px solid var(--line-strong)",
        paddingTop: "10px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--t-eyebrow)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "var(--muted)",
        marginBottom: "28px",
      }}
    >
      <span style={{ color: "var(--ink)", fontWeight: 500, fontSize: "12px" }}>{number}</span>
      <span>{label}</span>
      {trailing ? <span style={{ marginLeft: "auto", color: "var(--warm)" }}>{trailing}</span> : null}
    </div>
  );
}
