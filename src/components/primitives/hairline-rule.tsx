type HairlineRuleProps = {
  variant?: "default" | "strong" | "warm";
  className?: string;
};

export function HairlineRule({ variant = "default", className }: HairlineRuleProps) {
  const cls =
    variant === "strong" ? "rule-strong" :
    variant === "warm"   ? "rule-warm"   :
    "rule";
  return <hr className={`${cls} ${className ?? ""}`} />;
}
