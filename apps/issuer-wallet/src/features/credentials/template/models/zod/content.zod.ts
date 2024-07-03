import { z } from "zod";
import { jsonSchemaZod } from "./json-schema.zod";

export const contentZod = z.object({
  id: z.boolean().optional(),
  credentialSubject: z
    .array(jsonSchemaZod)
    .min(1, { message: "form.content.errors.credentialSubject.min" }),
});

export type ContentZod = z.infer<typeof contentZod>;

export const defaultContentZod: ContentZod = {
  id: false,
  credentialSubject: [],
};
