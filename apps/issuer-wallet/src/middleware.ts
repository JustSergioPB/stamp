import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLang, languages, cookieName } from "./i18n/constants";

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  let lang = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLang;

  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    );
  }

  const referer = req.headers.get("referer");

  if (referer) {
    const refererUrl = new URL(referer);
    const langInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (langInReferer) response.cookies.set(cookieName, langInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // matcher: '/:lang*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
