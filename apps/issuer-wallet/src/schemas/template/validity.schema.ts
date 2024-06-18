import { z } from "zod";

export const validitySchema = z.object({
  years: z.number().min(1, "Min is one").optional(),
  months: z.number().min(1, "Min is one").max(11, "Max is 11").optional(),
  days: z.number().min(1, "Min is one").max(30, "Max is 30").optional(),
  hours: z.number().min(1, "Min is one").max(23, "Max is 23").optional(),
  mins: z.number().min(1, "Min is one").max(59, "Max is 59").optional(),
  secs: z.number().min(1, "Min is one").max(59, "Max is 59").optional(),
});

export type ValiditySchema = z.infer<typeof validitySchema>;
