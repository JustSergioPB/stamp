import { FormField, FormSelect, WithHint } from "./form";

export type Dictionary = {
  schemas: string;
  schemasCTA: string;
  addSchema: string;
  createSchema: string;
  errorScreen: {
    title: string;
    subtitle: string;
    options: {
      refresh: string;
      tryAgain: string;
      sendEmail: string;
    };
  };
  paginator: {
    goToLast: string;
    goToFirst: string;
    goToNext: string;
    goToPrevious: string;
    page: string;
    of: string;
    rowsPerPage: string;
  };
  schemaForm: {
    name: FormField;
    data: FormField;
    types: WithHint;
    property: FormField;
    type: FormSelect<{
      string: string;
      number: string;
      boolean: string;
      object: string;
      list: string;
      date: string;
      did: string;
    }>;
    subtype: FormSelect<{
      string: string;
      number: string;
      boolean: string;
      object: string;
      list: string;
      date: string;
      did: string;
    }>;
    discard: string;
    save: string;
    addProperty: string;
  };
};
