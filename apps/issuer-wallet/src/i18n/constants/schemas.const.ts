import { ValueType } from "@stamp/domain";

export const VALUE_TYPE_LANG_MAP: Record<ValueType, string> = {
  string: "schemaForm.type.values.string",
  number: "schemaForm.type.values.number",
  boolean: "schemaForm.type.values.boolean",
  object: "schemaForm.type.values.object",
  list: "schemaForm.type.values.list",
  did: "schemaForm.type.values.did",
  date: "schemaForm.type.values.date",
};

export const LANG_MAP: Record<string, string> = {
  en: "schemaForm.lang.values.en",
  es: "schemaForm.lang.values.es",
};
