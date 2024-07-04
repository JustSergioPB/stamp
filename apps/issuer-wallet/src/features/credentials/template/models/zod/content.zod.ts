import { z } from "zod";
import { jsonSchemaZod } from "@features/credentials/json-schema/models";

export const contentZod = z.object({
  id: z.boolean().optional(),
  credentialSubject: z.object({
    properties: z
      .array(jsonSchemaZod)
      .min(1, { message: "form.content.errors.credentialSubject.min" }),
    required: z.array(z.string()).optional(),
  }),
});

export type ContentZod = z.infer<typeof contentZod>;

export const defaultContentZod: ContentZod = {
  id: false,
  credentialSubject: {
    properties: [],
    required: [],
  },
};
