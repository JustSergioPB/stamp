import { z } from "zod";
import { jsonSchema } from "./json.schema";

export const objectSchema = z.object({
  type: z.literal("object"),
  properties: z.record(z.lazy(() => jsonSchema)).optional(),
  required: z.array(z.string()).optional(),
  patternProperties: z.record(z.lazy(() => jsonSchema)).optional(),
  minProperties: z.number().optional(),
  maxProperties: z.number().optional(),
});

export type ObjectSchema = z.infer<typeof objectSchema>;
