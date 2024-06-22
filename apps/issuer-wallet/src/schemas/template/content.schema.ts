import { z } from "zod";
import { jsonSchema } from "./json.schema";

export const contentSchema = z.object({
  id: z.boolean().optional(),
  type: z.literal("object"),
  properties: z.object({
    credentialSubject: z.array(jsonSchema),
  }),
  required: z.array(z.string()),
});

export type ContentSchema = z.infer<typeof contentSchema>;
