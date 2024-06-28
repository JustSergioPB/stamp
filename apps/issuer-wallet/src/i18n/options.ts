import { defaultNamespace, fallbackLang, languages } from "./constants";

export function getOptions(lang = fallbackLang, namespace = defaultNamespace) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: fallbackLang,
    lng: lang,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns: namespace,
  };
}
