import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { TrackCard } from "@/components/cards/track-card";
import { tracks, endpoints, protocolLine } from "@/data/interface";

export function InterfaceBlock() {
  return (
    <section className="section">
      <SectionNumberBar number="05" label="Interface" trailing="How to work with me" />
      <h2 className="h-display-l" style={{ maxWidth: "20ch", marginBottom: "14px" }}>
        联系我，<br />不如说是调用我。
      </h2>
      <p style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "19px",
        lineHeight: 1.5, maxWidth: "60ch", margin: "0 0 22px",
      }}>{protocolLine}</p>

      <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: "22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {tracks.map((t) => <TrackCard key={t.title} track={t} />)}
        </div>
        <aside style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "10px", padding: "22px 24px" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Endpoints</span>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
            {endpoints.map((e, i) => (
              <li key={e.label} style={{
                padding: "10px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.15)",
                display: "flex", justifyContent: "space-between",
              }}>
                <a href={e.href} style={{ color: "var(--paper)" }}>{e.label}</a>
                <span style={{ opacity: 0.6 }}>{e.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
