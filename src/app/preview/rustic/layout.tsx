
import type { ReactNode } from "react";
import ThemeShell from "@/components/Shell/ThemeShell";

export default function RusticLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeShell theme="rustic">
      {children}
    </ThemeShell>
  );
}
