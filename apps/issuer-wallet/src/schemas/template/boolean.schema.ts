import { z } from "zod";

export const booleanSchema = z.object({
  type: z.literal("boolean"),
});

export type BooleanSchema = z.infer<typeof booleanSchema>;