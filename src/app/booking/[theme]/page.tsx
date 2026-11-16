import { Suspense } from "react";
import { notFound } from "next/navigation";

import ThemeShell from "@/components/Shell/ThemeShell";
import BookingShell from "@/components/Booking/BookingShell";
import type { ThemeName } from "@/config/themes";

interface BookingPageProps {
  params: Promise<{ theme: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BookingPageContent params={params} />
    </Suspense>
  );
}

async function BookingPageContent({ params }: BookingPageProps) {
  const { theme: themeParam } = await params;

  if (themeParam !== "rustic" && themeParam !== "luxury") {
    notFound();
  }

  const theme = themeParam as ThemeName;

  return (
    <ThemeShell theme={theme}>
      <BookingShell theme={theme} />
    </ThemeShell>
  );
}