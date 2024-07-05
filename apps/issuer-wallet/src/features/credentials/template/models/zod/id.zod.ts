import { idTypes } from "@stamp/domain";
import { z } from "zod";

export const idZod = z.object({
  present: z.boolean().optional(),
  type: z.enum(idTypes).optional(),
});

export type IdZod = z.infer<typeof idZod>;

export const defaultIdZod: IdZod = {
  present: false,
  type: "URL",
};
