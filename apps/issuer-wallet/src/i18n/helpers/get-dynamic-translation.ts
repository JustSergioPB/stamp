import { DICTIONARIES } from "../constants/dictionaries.const";
import { TranslationError } from "../errors/translation.error";

export function getDynamicTranslation(lang: string, chain: string): string {
  const keys = chain.split(".");
  let root = DICTIONARIES[lang];
  let translation = _iterateDictionary(root, keys);
  if (translation === undefined) {
    throw new Error(`Translation not found for ${chain}`);
  }
  return translation;
}

function _iterateDictionary(dictionary: any, keys: string[]): string | any {
  if (dictionary === undefined) {
    throw new TranslationError(`Translation not found for ${keys[0]}`);
  }

  if (keys.length !== 0) {
    const nextKey = keys[0];
    keys.shift();

    if (nextKey === undefined) {
      throw new TranslationError(`Translation not found for ${nextKey}`);
    }

    return _iterateDictionary(dictionary[nextKey], keys);
  }

  return dictionary;
}
