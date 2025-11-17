"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({
  currentLang,
}: {
  currentLang: "en" | "fr";
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLang: string) => {
    // Replace /en or /fr at the start of the path
    const updatedPath = pathname.replace(/^\/(en|fr)/, `/${newLang}`);
    router.push(updatedPath);
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => handleChange(e.target.value)}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      <option value="en">English</option>
      <option value="fr">French</option>
    </select>
  );
}
