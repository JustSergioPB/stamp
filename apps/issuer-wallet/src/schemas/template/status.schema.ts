import { z } from "zod";

export const statusSchema = z.object({
  revocable: z.boolean().optional(),
  suspendable: z.boolean().optional(),
  states: z.array(z.string()).optional(),
  defaultState: z.string().optional(),
});

export type StatusSchema = z.infer<typeof statusSchema>;
