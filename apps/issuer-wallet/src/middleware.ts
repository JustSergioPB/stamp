import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { SUPPORTED_LOCALES } from "./i18n/constants/supported-locales.const";
import { DEFAULT_LOCALE } from "./i18n/constants/default-locale.const";
import { NextRequest, NextResponse } from "next/server";

function getLocale(request: Request): string {
  const headers = new Headers(request.headers);
  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
}

export function middleware(request: NextRequest) {
  const locale = getLocale(request) ?? DEFAULT_LOCALE;
  const pathname = request.nextUrl.pathname;
  let url = `/${locale}${pathname}`;
  const params = Object.fromEntries(request.nextUrl.searchParams);
  if (Object.keys(params).length > 0) {
    url += `?${new URLSearchParams(params)}`;
  }
  const newUrl = new URL(url, request.nextUrl);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};