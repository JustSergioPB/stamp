import { z } from "zod";

export const baseSchema = z.object({
  id: z.object({
    present: z.boolean().optional(),
    type: z.string().optional(),
  }),
  type: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  lang: z.string().optional(),
});

export type BaseSchema = z.infer<typeof baseSchema>;
