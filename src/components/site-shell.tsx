import type { ReactNode } from "react";
import { Topbar } from "./shell/topbar";
import { Footer } from "./shell/footer";
import { pageLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  current: string;
};

export function SiteShell({ children, current }: SiteShellProps) {
  return (
    <main className="page">
      <Topbar current={current} links={[...pageLinks]} />
      {children}
      <Footer />
    </main>
  );
}
