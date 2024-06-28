import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./options";

const initI18next = async (lang: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./translations/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function useTranslation(
  lang: string,
  namespace: string,
  options: { [key: string]: any } = { keyPrefix: "" }
  // eslint-disable-next-line no-unused-vars
): Promise<{ t: (key: string) => string; i18n: any }> {
  const i18nextInstance = await initI18next(lang, namespace);
  return {
    t: i18nextInstance.getFixedT(
      lang,
      Array.isArray(namespace) ? namespace[0] : namespace,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
