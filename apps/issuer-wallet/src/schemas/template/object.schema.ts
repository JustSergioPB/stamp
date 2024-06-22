import { z } from "zod";
import { JsonSchema, jsonSchema } from "./json.schema";

export const baseObjectSchema = z.object({
  type: z.literal("object"),
  patternProperties: z.record(z.lazy(() => jsonSchema)).optional(),
  minProperties: z.number().optional(),
  maxProperties: z.number().optional(),
});

type BaseObjectSchema = z.infer<typeof baseObjectSchema> & {
  properties: JsonSchema[];
};

export const objectSchema: z.ZodType<BaseObjectSchema> =
  baseObjectSchema.extend({
    properties: z.lazy(() => z.array(jsonSchema)),
  });

export type ObjectSchema = z.infer<typeof objectSchema>;
