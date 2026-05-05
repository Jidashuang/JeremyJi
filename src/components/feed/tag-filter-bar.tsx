"use client";

import { Tag } from "@/components/primitives/tag";
import type { AreaFilter } from "@/lib/feed";

type Props = {
  active: AreaFilter;
  onChange: (a: AreaFilter) => void;
};

const FILTERS: Array<{ value: AreaFilter; label: string }> = [
  { value: "all",         label: "All" },
  { value: "japan",       label: "Japan" },
  { value: "marketing",   label: "Marketing" },
  { value: "design",      label: "Design" },
  { value: "field-notes", label: "Field Notes" },
  { value: "media",       label: "Media" },
];

export function TagFilterBar({ active, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
      {FILTERS.map((f) => (
        <Tag key={f.value} active={active === f.value} onClick={() => onChange(f.value)}>
          {f.label}
        </Tag>
      ))}
    </div>
  );
}
