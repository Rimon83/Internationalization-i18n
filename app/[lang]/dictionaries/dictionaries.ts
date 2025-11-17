import "server-only";

type Locale = "en" | "fr";

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
