import LanguageSwitcher from "./components/LanguageSwitcher";
import { getDictionary } from "./dictionaries/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
    const { lang } = await params; 
  const dict = await getDictionary(lang);

  return (
    <main>
      <LanguageSwitcher currentLang={lang}/>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </main>
  );
}
