import { z } from "zod";
import { objectJsonSchemaZod } from "@features/credentials/json-schema/models";
import { defaultIdZod, idZod } from "./id.zod";

export const contentZod = z.object({
  id: idZod.optional(),
  credentialSubject: objectJsonSchemaZod,
  isAnonymous: z.boolean().optional(),
});

export type ContentZod = z.infer<typeof contentZod>;

export const defaultContentZod: ContentZod = {
  id: defaultIdZod,
  isAnonymous: false,
  credentialSubject: {
    title: "credentialSubject",
    type: "object",
  },
};
