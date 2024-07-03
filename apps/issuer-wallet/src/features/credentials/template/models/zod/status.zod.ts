import { z } from "zod";

export const statusZod = z.object({
  revocable: z.boolean().optional(),
  suspendable: z.boolean().optional(),
  states: z.array(z.string()).optional(),
  defaultState: z.string().optional(),
});

export type StatusZod = z.infer<typeof statusZod>;

export const defaultStatusSchema: StatusZod = {
  revocable: false,
  suspendable: false,
  states: [],
  defaultState: "",
};
