import { z } from "zod";
import { objectSchema } from "./object.schema";

export const contentSchema = z.object({
  withId: z.boolean().optional(),
  type: z.literal("object"),
  properties: z.object({
    credentialSubject: objectSchema,
  }),
  required: z.array(z.string()),
});

export type ContentSchema = z.infer<typeof contentSchema>;
