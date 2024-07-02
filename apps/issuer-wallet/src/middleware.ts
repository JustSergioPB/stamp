import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLang, languages, langCookieName } from "./i18n/constants";
import { verifySession } from "@features/auth/server";

acceptLanguage.languages(languages);

export async function middleware(req: NextRequest) {
  const referer = req.headers.get("referer");

  if (referer) {
    const refererUrl = new URL(referer);
    const langInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (langInReferer) response.cookies.set(langCookieName, langInReferer);
    return response;
  }

  let lang = acceptLanguage.get(req.cookies.get(langCookieName)?.value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLang;

  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`));
  }

  const session = await verifySession();
  const isAppRoute = "/app".includes(req.nextUrl.pathname);
  const isAdminRoute = "/admin".includes(req.nextUrl.pathname);
  const isAdmin = session && session.role === "superAdmin";
  const belongsToOrg = session && session.orgId.includes(req.nextUrl.pathname);

  if (isAppRoute && !session) {
    return NextResponse.redirect(new URL(`${lang}/auth`, req.nextUrl));
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(`${lang}/403`, req.nextUrl));
  }

  if (!isAdmin && !belongsToOrg) {
    return NextResponse.redirect(new URL(`${lang}/403`, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: '/:lang*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
