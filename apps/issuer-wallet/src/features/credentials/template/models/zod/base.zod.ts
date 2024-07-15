import { z } from "zod";
import { idZod } from "./id.zod";

export const baseZod = z.object({
  id: idZod.optional(),
  type: z
    .array(z.string())
    .optional()
    .transform((val) => (val?.length === 0 ? undefined : val)),
  name: z
    .string()
    .optional()
    .transform((val) => val ?? undefined),
  description: z
    .string()
    .optional()
    .transform((val) => val ?? undefined),
  lang: z
    .string()
    .optional()
    .transform((val) => val ?? undefined),
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
