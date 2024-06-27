import { z } from "zod";
import { jsonSchema } from "./json.schema";

export const contentSchema = z.object({
  id: z.boolean().optional(),
  credentialSubject: z
    .array(jsonSchema)
    .min(1, { message: "At least one property is required" }),
});

export type ContentSchema = z.infer<typeof contentSchema>;

export const defaultContentSchema: ContentSchema = {
  id: false,
  credentialSubject: [],
};
