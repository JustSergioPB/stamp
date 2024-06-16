import { z } from "zod";

export const stringSchema = z.object({
  type: z.literal("string"),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  format: z.string().optional(),
});

export type StringSchema = z.infer<typeof stringSchema>;
