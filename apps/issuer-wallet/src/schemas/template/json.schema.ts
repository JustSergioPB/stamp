import { JSONSchemaTypes } from "@stamp/domain";
import { ZodSchema, z } from "zod";

export const jsonSchema: ZodSchema = z.object({
  name: z.string(),
  type: z.enum(JSONSchemaTypes),
  subtype: z.string().optional(),
  required: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  format: z.string().optional(),
  minimum: z.number().optional(),
  exclusiveMinimum: z.boolean().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.boolean().optional(),
  multipleOf: z.number().optional(),
  items: z.lazy(() => jsonSchema).optional(),
  prefixItems: z.array(z.lazy(() => jsonSchema)).optional(),
  contains: z.lazy(() => jsonSchema).optional(),
  minItems: z.number().optional(),
  maxItems: z.number().optional(),
  uniqueItems: z.boolean().optional(),
  properties: z.lazy(() => z.array(jsonSchema)).optional(),
  minProperties: z.number().optional(),
  maxProperties: z.number().optional(),
});

export type JsonSchema = z.infer<typeof jsonSchema>;

export const defaultJsonSchema: JsonSchema = {
  name: "",
  type: "",
};
