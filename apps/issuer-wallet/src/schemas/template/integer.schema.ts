import { z } from "zod";

export const integerSchema = z.object({
  type: z.literal("integer"),
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  multipleOf: z.number().optional(),
});

export type IntegerSchema = z.infer<typeof integerSchema>;