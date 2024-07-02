"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "./options";
import { langCookieName, languages } from "./constants";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./translations/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  lang: string,
  ns: string,
  options: { [key: string]: any } = {}
) {
  const [cookies, setCookie] = useCookies([langCookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang);
  } else {
    const [activeLang, setActiveLang] = useState(i18n.resolvedLanguage);
    useEffect(() => {
      if (activeLang === i18n.resolvedLanguage) return;
      setActiveLang(i18n.resolvedLanguage);
    }, [activeLang, i18n.resolvedLanguage]);
    useEffect(() => {
      if (!lang || i18n.resolvedLanguage === lang) return;
      i18n.changeLanguage(lang);
    }, [lang, i18n]);
    useEffect(() => {
      if (cookies["x-lang"] === lang) return;
      setCookie(langCookieName, lang, { path: "/" });
    }, [lang, cookies["x-lang"], setCookie, cookies]);
  }
  return ret;
}
