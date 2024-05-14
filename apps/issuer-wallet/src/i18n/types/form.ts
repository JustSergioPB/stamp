export type FormField = {
  placeholder: string;
  label: string;
};

export type WithHint = FormField & {
  hint: string;
};

export type FormSelect<values extends { [key: string]: string }> = FormField & {
  values: values;
};
