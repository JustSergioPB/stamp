import { z } from "zod";

export const validityZod = z.object({
  years: z.number().min(1, "form.validity.errors.min").optional(),
  months: z.coerce
    .number()
    .min(1, "form.validity.errors.min")
    .max(11, "form.validity.errors.max")
    .optional(),
  days: z.coerce
    .number()
    .min(1, "form.validity.errors.min")
    .max(30, "form.validity.errors.max")
    .optional(),
  hours: z.coerce
    .number()
    .min(1, "form.validity.errors.min")
    .max(23, "form.validity.errors.max")
    .optional(),
  mins: z.coerce
    .number()
    .min(1, "form.validity.errors.min")
    .max(59, "form.validity.errors.max")
    .optional(),
  secs: z.coerce
    .number()
    .min(1, "form.validity.errors.min")
    .max(59, "form.validity.errors.max")
    .optional(),
});

export type ValidityZod = z.infer<typeof validityZod>;

export const defaultValiditySchema: ValidityZod = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
};
