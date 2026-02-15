import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "color-theme";

type ThemeVariable =
  | "--background"
  | "--foreground"
  | "--card"
  | "--card-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--muted"
  | "--muted-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--border"
  | "--input"
  | "--ring"
  | "--sidebar"
  | "--sidebar-background"
  | "--sidebar-foreground"
  | "--sidebar-accent"
  | "--sidebar-accent-foreground"
  | "--sidebar-border";

type ThemePalette = Record<ThemeVariable, string>;

export type ColorTheme =
  | "default"
  | "serika"
  | "olivia"
  | "botanical"
  | "midnight"
  | "dracula"
  | "latte"
  | "paper"
  | "sunset"
  | "ocean"
  | "forest"
  | "lavender"
  | "rose"
  | "amber"
  | "terminal"
  | "nord"
  | "gruvbox"
  | "evergreen"
  | "sakura"
  | "neon";

export interface ColorThemeDefinition {
  id: ColorTheme;
  name: string;
  swatches: [string, string, string];
  palette: ThemePalette;
}

const createPalette = (background: string, foreground: string, primary: string, accent: string, border: string): ThemePalette => ({
  "--background": background,
  "--foreground": foreground,
  "--card": background,
  "--card-foreground": foreground,
  "--popover": background,
  "--popover-foreground": foreground,
  "--primary": primary,
  "--primary-foreground": background,
  "--secondary": accent,
  "--secondary-foreground": foreground,
  "--muted": accent,
  "--muted-foreground": foreground,
  "--accent": accent,
  "--accent-foreground": background,
  "--border": border,
  "--input": border,
  "--ring": primary,
  "--sidebar": background,
  "--sidebar-background": background,
  "--sidebar-foreground": foreground,
  "--sidebar-accent": accent,
  "--sidebar-accent-foreground": foreground,
  "--sidebar-border": border,
});

export const colorThemes: ColorThemeDefinition[] = [
  { id: "default", name: "Default", swatches: ["0 0% 100%", "0 0% 0%", "0 0% 90%"], palette: createPalette("0 0% 100%", "0 0% 0%", "0 0% 0%", "0 0% 90%", "0 0% 0%") },
  { id: "serika", name: "Serika", swatches: ["22 20% 10%", "40 96% 67%", "38 73% 55%"], palette: createPalette("22 20% 10%", "50 70% 72%", "40 96% 67%", "24 20% 17%", "36 45% 46%") },
  { id: "olivia", name: "Olivia", swatches: ["125 13% 11%", "41 35% 64%", "43 45% 63%"], palette: createPalette("125 13% 11%", "35 30% 82%", "41 35% 64%", "125 10% 19%", "43 20% 45%") },
  { id: "botanical", name: "Botanical", swatches: ["198 43% 95%", "171 51% 36%", "171 40% 48%"], palette: createPalette("198 43% 95%", "171 38% 22%", "171 51% 36%", "198 35% 90%", "171 26% 36%") },
  { id: "midnight", name: "Midnight", swatches: ["230 35% 9%", "220 82% 66%", "252 48% 43%"], palette: createPalette("230 35% 9%", "220 30% 90%", "220 82% 66%", "252 30% 20%", "220 35% 40%") },
  { id: "dracula", name: "Dracula", swatches: ["232 15% 15%", "326 100% 74%", "191 97% 77%"], palette: createPalette("232 15% 15%", "60 30% 96%", "326 100% 74%", "232 15% 24%", "291 15% 50%") },
  { id: "latte", name: "Latte", swatches: ["30 35% 93%", "25 70% 40%", "35 48% 75%"], palette: createPalette("30 35% 93%", "22 35% 22%", "25 70% 40%", "35 48% 75%", "30 25% 45%") },
  { id: "paper", name: "Paper", swatches: ["42 30% 96%", "28 48% 28%", "15 58% 58%"], palette: createPalette("42 30% 96%", "28 48% 28%", "15 58% 58%", "42 18% 87%", "28 20% 45%") },
  { id: "sunset", name: "Sunset", swatches: ["312 28% 15%", "14 95% 67%", "41 100% 58%"], palette: createPalette("312 28% 15%", "35 100% 93%", "14 95% 67%", "320 30% 23%", "14 70% 52%") },
  { id: "ocean", name: "Ocean", swatches: ["203 55% 13%", "194 100% 52%", "166 65% 43%"], palette: createPalette("203 55% 13%", "187 90% 91%", "194 100% 52%", "203 45% 22%", "194 70% 45%") },
  { id: "forest", name: "Forest", swatches: ["130 25% 12%", "95 45% 50%", "135 40% 30%"], palette: createPalette("130 25% 12%", "85 35% 86%", "95 45% 50%", "135 30% 20%", "95 32% 38%") },
  { id: "lavender", name: "Lavender", swatches: ["257 35% 96%", "262 54% 50%", "290 42% 72%"], palette: createPalette("257 35% 96%", "261 26% 23%", "262 54% 50%", "270 32% 87%", "262 30% 45%") },
  { id: "rose", name: "Rose", swatches: ["342 45% 96%", "342 70% 48%", "7 80% 61%"], palette: createPalette("342 45% 96%", "345 45% 26%", "342 70% 48%", "342 33% 86%", "346 33% 48%") },
  { id: "amber", name: "Amber", swatches: ["36 65% 95%", "27 94% 46%", "43 90% 55%"], palette: createPalette("36 65% 95%", "30 45% 20%", "27 94% 46%", "38 58% 84%", "32 38% 44%") },
  { id: "terminal", name: "Terminal", swatches: ["132 25% 6%", "120 100% 54%", "151 88% 37%"], palette: createPalette("132 25% 6%", "120 92% 75%", "120 100% 54%", "132 25% 13%", "120 50% 36%") },
  { id: "nord", name: "Nord", swatches: ["220 16% 22%", "193 43% 67%", "219 28% 88%"], palette: createPalette("220 16% 22%", "219 28% 88%", "193 43% 67%", "220 17% 30%", "213 15% 50%") },
  { id: "gruvbox", name: "Gruvbox", swatches: ["43 25% 17%", "42 68% 59%", "16 67% 52%"], palette: createPalette("43 25% 17%", "45 45% 82%", "42 68% 59%", "43 21% 27%", "42 34% 45%") },
  { id: "evergreen", name: "Evergreen", swatches: ["163 44% 12%", "142 56% 50%", "175 57% 37%"], palette: createPalette("163 44% 12%", "147 45% 90%", "142 56% 50%", "163 35% 20%", "170 36% 42%") },
  { id: "sakura", name: "Sakura", swatches: ["343 58% 97%", "338 78% 61%", "288 40% 68%"], palette: createPalette("343 58% 97%", "333 32% 24%", "338 78% 61%", "338 38% 88%", "334 33% 48%") },
  { id: "neon", name: "Neon", swatches: ["260 25% 8%", "180 100% 50%", "300 100% 58%"], palette: createPalette("260 25% 8%", "180 50% 93%", "180 100% 50%", "260 24% 16%", "300 100% 58%") },
];

const themeIds = new Set<ColorTheme>(colorThemes.map((theme) => theme.id));
const defaultTheme: ColorTheme = "default";

const isColorTheme = (value: string | null): value is ColorTheme => value !== null && themeIds.has(value as ColorTheme);

const applyPalette = (palette: ThemePalette) => {
  Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

export function useColorTheme() {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return isColorTheme(storedTheme) ? storedTheme : defaultTheme;
  });

  const activeTheme = useMemo(
    () => colorThemes.find((theme) => theme.id === colorTheme) ?? colorThemes[0],
    [colorTheme],
  );

  useEffect(() => {
    applyPalette(activeTheme.palette);
    window.localStorage.setItem(STORAGE_KEY, activeTheme.id);
  }, [activeTheme]);

  return {
    colorTheme,
    setColorTheme: (value: string) => {
      if (isColorTheme(value)) {
        setColorThemeState(value);
      }
    },
    colorThemes,
  };
}
