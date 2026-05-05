import { SiteShell } from "@/components/site-shell";
import { SectionNumberBar } from "@/components/primitives/section-number-bar";
import { CaseCard } from "@/components/cards/case-card";
import { DownloadButton } from "@/components/primitives/download-button";
import { cases } from "@/data/cases";

const TIMELINE_DETAIL = [
  {
    when: "2023.12 — 2024.04",
    role: "Sr. Media Planning Mgr",
    who: "OMG · Hearts & Science",
    clients: "Range Rover, Jaguar — see CV for full list",
  },
  {
    when: "2021.09 — 2023.09",
    role: "Planning Manager",
    who: "EssenceMediacom",
    clients: "Nintendo, Bicester Village — see CV for full list",
  },
  {
    when: "2021.03 — 2021.09",
    role: "Planning Manager",
    who: "Havas",
    clients: "see CV for client list",
  },
  {
    when: "2019.10 — 2021.03",
    role: "Asst. Planning Mgr",
    who: "Dentsu Aegis",
    clients: "PUMA — see CV for full list",
  },
];

export default function ProofOfWorkPage() {
  return (
    <SiteShell current="proof">
      <section className="section" style={{ paddingTop: "20px" }}>
        <SectionNumberBar number="02" label="Proof of Work" trailing="Cases & career" />
        <h1 className="h-display-l" style={{ maxWidth: "18ch", marginBottom: "20px" }}>
          我做过的事，<br />我学到的事。
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "28px" }}>
          {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} />)}
        </div>

        <h2 className="h-display-m" style={{ marginTop: "60px", marginBottom: "20px" }}>Career timeline</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {TIMELINE_DETAIL.map((j) => (
            <div key={j.when} style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              padding: "20px 0",
              borderBottom: "1px solid var(--line)",
              gap: "24px",
            }}>
              <span className="eyebrow">{j.when}</span>
              <div>
                <h3 className="h-display-m" style={{ fontSize: "22px" }}>{j.role} · {j.who}</h3>
                <p className="caption" style={{ marginTop: "6px" }}>Clients: {j.clients}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <DownloadButton href="/cv/jeremy-ji-cv-en.pdf">↓ Download CV · EN</DownloadButton>
          <DownloadButton href="/cv/jeremy-ji-cv-cn.pdf" variant="ghost">↓ CV · 中文</DownloadButton>
        </div>
      </section>
    </SiteShell>
  );
}
