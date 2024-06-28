import { z } from "zod";

export const validityZod = z.object({
  years: z.number().min(1, "Min is one").optional(),
  months: z.number().min(1, "Min is one").max(11, "Max is 11").optional(),
  days: z.number().min(1, "Min is one").max(30, "Max is 30").optional(),
  hours: z.number().min(1, "Min is one").max(23, "Max is 23").optional(),
  mins: z.number().min(1, "Min is one").max(59, "Max is 59").optional(),
  secs: z.number().min(1, "Min is one").max(59, "Max is 59").optional(),
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
