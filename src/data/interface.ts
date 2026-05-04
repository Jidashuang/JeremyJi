export type CollabTrack = { title: string; summary: string; goodFor: string[] };
export type Endpoint = { label: string; value: string; href: string };

export const protocolLine = "[Protocol line — written in Phase 3 Task 35.]";

export const tracks: CollabTrack[] = [
  { title: "Media Strategy Consult", summary: "媒介策略诊断 / 渠道与组合判断 / KPI 复盘", goodFor: ["[in Phase 3 Task 35]"] },
  { title: "Brief Refinement",       summary: "把模糊的业务诉求变成可执行 brief",          goodFor: ["[in Phase 3 Task 35]"] },
  { title: "Speaking · Partnership", summary: "分享 / 工作坊 / 内容合作",                    goodFor: ["[in Phase 3 Task 35]"] },
];

export const endpoints: Endpoint[] = [
  { label: "Email",    value: "[in Phase 3 Task 35]", href: "mailto:hello@example.com" },
  { label: "LinkedIn", value: "/in/jeremyji", href: "https://www.linkedin.com/in/jeremyji" },
  { label: "WeChat",   value: "by intro only", href: "#" },
  { label: "Telegram", value: "@jeremyjee",   href: "https://t.me/jeremyjee" },
];
