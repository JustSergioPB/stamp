import { z } from "zod";

export const nullSchema = z.object({
  type: z.literal("null"),
});

export type NullSchema = z.infer<typeof nullSchema>;