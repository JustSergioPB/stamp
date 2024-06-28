import { z } from "zod";
import { jsonSchemaZod } from "./json.zod";

export const contentZod = z.object({
  id: z.boolean().optional(),
  credentialSubject: z
    .array(jsonSchemaZod)
    .min(1, { message: "At least one property is required" }),
});

export type ContentZod = z.infer<typeof contentZod>;

export const defaultContentZod: ContentZod = {
  id: false,
  credentialSubject: [],
};
