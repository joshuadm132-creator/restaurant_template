
import type { ReactNode } from "react";
import ThemeShell from "@/components/Shell/ThemeShell";

export default function LuxuryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeShell theme="luxury">
      {children}
    </ThemeShell>
  );
}
