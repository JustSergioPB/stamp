import { z } from "zod";

export const baseZod = z.object({
  id: z.object({
    present: z.boolean().optional(),
    type: z.enum(["URL", "DID", "UUID"]).optional(),
  }),
  type: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  lang: z.string().optional(),
});

export type BaseZod = z.infer<typeof baseZod>;

export const defaultBaseZod: BaseZod = {
  id: {
    present: false,
    type: "URL",
  },
  type: [],
  name: "",
  description: "",
  lang: "",
};
