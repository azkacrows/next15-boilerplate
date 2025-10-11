export type Locale = "en" | "id" | "ja";

export const locales: ReadonlyArray<Locale> = ["en", "id", "ja"] as const;
export const defaultLocale: Locale = "en";

// Type-safe locale validation
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Locale metadata for display
export const localeMetadata: Record<Locale, { name: string; nativeName: string }> = {
  en: { name: "English", nativeName: "English" },
  id: { name: "Indonesian", nativeName: "Bahasa Indonesia" },
  ja: { name: "Japanese", nativeName: "日本語" },
};
