import { z } from "zod";
import { jsonSchema } from "./json.schema";

export const contentSchema = z.object({
  id: z.boolean().optional(),
  credentialSubject: z.array(jsonSchema),
});

export type ContentSchema = z.infer<typeof contentSchema>;
