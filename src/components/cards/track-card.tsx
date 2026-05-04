import type { CollabTrack } from "@/data/interface";

export function TrackCard({ track }: { track: CollabTrack }) {
  return (
    <article style={{ padding: "16px", border: "1px solid var(--line)", borderRadius: "6px", background: "var(--paper)" }}>
      <h4 className="h-3" style={{ fontSize: "14px", marginBottom: "6px" }}>{track.title}</h4>
      <p className="caption" style={{ margin: 0 }}>{track.summary}</p>
    </article>
  );
}
