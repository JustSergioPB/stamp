import { z } from "zod";

export const numberSchema = z.object({
  type: z.literal("number"),
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  multipleOf: z.number().optional(),
});

export type NumberSchema = z.infer<typeof numberSchema>;