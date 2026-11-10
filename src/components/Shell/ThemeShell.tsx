
import type { CSSProperties, ReactNode } from "react";
import { themes, type ThemeName } from "@/config/themes";

interface ThemeShellProps {
  theme: ThemeName;
  children: ReactNode;
}

export default function ThemeShell({
  theme,
  children,
}: ThemeShellProps) {
  const selectedTheme = themes[theme];

  const themeStyles = {
    "--color-background": selectedTheme.colors.background,
    "--color-surface": selectedTheme.colors.surface,
    "--color-foreground": selectedTheme.colors.foreground,
    "--color-muted": selectedTheme.colors.muted,
    "--color-primary": selectedTheme.colors.primary,
    "--color-primary-hover": selectedTheme.colors.primaryHover,
    "--color-on-primary": selectedTheme.colors.onPrimary,
    "--color-accent": selectedTheme.colors.accent,
    "--color-border": selectedTheme.colors.border,

    "--font-display": selectedTheme.fonts.display,
    "--font-body": selectedTheme.fonts.body,

    colorScheme: theme === "luxury" ? "dark" : "light",
  } as CSSProperties;

  return (
    <div
      data-theme={theme}
      style={themeStyles}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
