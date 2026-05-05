import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { PullQuote } from "@/components/primitives/pull-quote";
import { tracks, endpoints, faq, briefTemplate, protocolLine } from "@/data/interface";

export default function InterfacePage() {
  const mailtoBody = encodeURIComponent(briefTemplate);
  const briefSubject = encodeURIComponent("[Brief] ");
  const emailEndpoint = endpoints.find((e) => e.label === "Email");
  const briefHref = emailEndpoint
    ? `${emailEndpoint.href}?subject=${briefSubject}&body=${mailtoBody}`
    : "#";

  return (
    <SiteShell current="interface">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="05" label="Interface" trailing="How to work with me" />
        <h1 className="h-display-l">联系我，<br />不如说是调用我。</h1>
        <PullQuote>{protocolLine}</PullQuote>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Collaboration tracks</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
          {tracks.map((t) => (
            <article key={t.title} style={{ padding: "20px", border: "1px solid var(--line)", borderRadius: "8px", background: "var(--paper)" }}>
              <h3 className="h-3">{t.title}</h3>
              <p className="caption" style={{ margin: "8px 0 14px" }}>{t.summary}</p>
              <p className="eyebrow">Good for</p>
              <ul className="caption" style={{ paddingLeft: "16px", marginTop: "6px" }}>
                {t.goodFor.map((g) => <li key={g}>{g}</li>)}
              </ul>
              <p className="eyebrow" style={{ marginTop: "14px" }}>Send this</p>
              <p className="caption" style={{ marginTop: "4px" }}>{t.sendThis}</p>
            </article>
          ))}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Send a brief</h2>
        <p className="body-l measure">直接用模板发邮件给我，最省时间。</p>
        <a href={briefHref} className="pill pill-solid" style={{ marginTop: "16px" }}>Open mail composer →</a>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>Endpoints</h2>
        <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", borderTop: "1px solid var(--line)" }}>
          {endpoints.map((e) => (
            <li key={e.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
              <a href={e.href}>{e.label}</a>
              <span style={{ color: "var(--muted)" }}>{e.value}</span>
            </li>
          ))}
        </ul>

        <h2 className="h-display-m" style={{ marginTop: "40px" }}>FAQ</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {faq.map((entry) => (
            <details key={entry.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
              <summary className="h-3" style={{ cursor: "pointer" }}>{entry.q}</summary>
              <p className="body" style={{ marginTop: "10px" }}>{entry.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
