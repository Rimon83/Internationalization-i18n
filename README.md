🌍 Custom Internationalization (i18n) in Next.js

A lightweight, dependency-free approach to implementing multilingual support (English 🇬🇧 + French 🇫🇷) in a Next.js App Router project.

🚀 Features

🌐 Detects user language using Accept-Language header
🔀 Auto-redirects users to /en or /fr
📚 JSON-based dictionaries
🧩 Fully dynamic: works with all pages under [lang]
🎛️ Includes a dropdown language switcher
🪶 No opinionated frameworks (unlike next-intl)

📦 Installation
```
npm install @formatjs/intl-localematcher
npm install negotiator
```

📁 Project Structure
```
app/
 └── [lang]/
     ├── layout.tsx
     ├── page.tsx
     └── dictionaries/
          ├── dictionaries.ts
          ├── en.json
          └── fr.json
     └── components/
          └── LanguageSwitcher.tsx
proxy.ts

```

🧠 Step 1 — Create Proxy for Language Detection
proxy.ts

```
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

let locales = ["en", "fr"];
let defaultLocale = "en";

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers: Record<string, string | string[] | undefined> = {
    "accept-language": acceptedLanguage,
  };
  const languages = new Negotiator({ headers }).languages();

  const locale = match(languages, locales, defaultLocale); // -> 'en-US'
  return locale;
}
export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|assets|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

```

🧠 Step 2 — Create Dictionaries
app/[lang]/dictionaries/dictionaries.ts

```
import "server-only";

type Locale = "en" | "fr";

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
```

en.json
```
{
  "home": {
    "title": "Welcome to Our Website",
    "description": "This is a simple example demonstrating internationalization in Next.js."
  }
}
```
fr.json
```
{
  "home": {
    "title": "Bienvenue sur notre site Web",
    "description": "Ceci est un exemple simple démontrant l’internationalisation dans Next.js."
  }
}
```


🌐 Step 3 — Add the Dropdown Lang Switcher
components/LanguageSwitcher.tsx
```
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
```

🧠 Step 4 — Use Dictionary in Pages
app/[lang]/page.tsx
```
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

```

🎉 Conclusion

With this setup you now have:

✨ Custom multilingual support
✨ Automatic language detection
✨ Fully dynamic routing using [lang]
✨ Optional dictionary expansion
✨ Works in both static and server-rendered pages

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the repository or contact the development team.

<div align="center">
Built with ❤️ for the Next JS

⭐ Star this repo if you found it helpful!

</div>