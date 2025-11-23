import { getDictionary } from "./dictionaries/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
    const { lang } = await params; 
  const dict = await getDictionary(lang);

  return (
    <main className="p-8 bg-gray-100 h-screen">
      
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </main>
  );
}
