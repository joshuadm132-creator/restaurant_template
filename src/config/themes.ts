
export const themes = {
  rustic: {
    name: "Rustic & Warm",

    colors: {
      background: "#F5F0E7",
      surface: "#FBF8F2",
      foreground: "#38352D",
      muted: "#716B5F",

      primary: "#A65D42",
      primaryHover: "#874832",
      onPrimary: "#FFFFFF",

      accent: "#C5A77B",
      border: "#D9CDBB",
    },

    fonts: {
      display: "var(--font-cormorant), Georgia, serif",
      body: "var(--font-dm-sans), Arial, sans-serif",
    },
  },

  luxury: {
    name: "Luxury & Elegant",

    colors: {
      background: "#171613",
      surface: "#211F1A",
      foreground: "#F4F0E8",
      muted: "#B8B1A4",

      primary: "#D2B887",
      primaryHover: "#E2CFA4",
      onPrimary: "#211D17",

      accent: "#8F7751",
      border: "#484236",
    },

    fonts: {
      display: "var(--font-bodoni), Georgia, serif",
      body: "var(--font-manrope), Arial, sans-serif",
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
