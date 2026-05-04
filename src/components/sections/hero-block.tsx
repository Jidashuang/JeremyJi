import Image from "next/image";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Pill } from "@/components/primitives/pill";

type HeroBlockProps = {
  eyebrow: string;
  headlineParts: { lead: string; emphasis: string; tail?: string };
  subline: string;
  lede: string;
  ctas: Array<{ href: string; label: string; solid?: boolean }>;
  portraitSrc: string;
  portraitAlt: string;
};

export function HeroBlock(props: HeroBlockProps) {
  return (
    <section className="section" style={{ paddingBottom: "36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "36px", alignItems: "end" }}>
        <div>
          <Eyebrow>{props.eyebrow}</Eyebrow>
          <h1 className="h-display-xl" style={{ marginTop: "14px" }}>
            {props.headlineParts.lead}
            <em style={{ fontStyle: "italic", color: "var(--warm)" }}>{props.headlineParts.emphasis}</em>
            {props.headlineParts.tail ?? ""}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--t-body-l)",
              fontStyle: "italic",
              color: "var(--warm-dark)",
              marginTop: "8px",
            }}
          >
            {props.subline}
          </p>
          <p className="body-l measure" style={{ marginTop: "22px" }}>{props.lede}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
            {props.ctas.map((c) => (
              <Pill key={c.href} href={c.href} variant={c.solid ? "solid" : "default"}>{c.label}</Pill>
            ))}
          </div>
        </div>
        <div
          style={{
            aspectRatio: "4 / 5",
            border: "1px solid var(--line)",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={props.portraitSrc}
            alt={props.portraitAlt}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
