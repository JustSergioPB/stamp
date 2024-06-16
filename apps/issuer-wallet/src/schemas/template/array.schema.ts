import { z } from "zod";
import { jsonSchema } from "./json.schema";

export const arraySchema = z.object({
  type: z.literal("array"),
  items: z.lazy(() => jsonSchema).optional(),
  prefixItems: z.array(z.lazy(() => jsonSchema)).optional(),
  contains: z.lazy(() => jsonSchema).optional(),
  minItems: z.number().optional(),
  maxItems: z.number().optional(),
  uniqueItems: z.boolean().optional(),
});

export type ArraySchema = z.infer<typeof arraySchema>;
