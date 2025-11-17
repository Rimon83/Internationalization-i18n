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
