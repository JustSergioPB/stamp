import { JSONSchemaTypes } from "@stamp/domain";
import { ZodSchema, z } from "zod";

export const jsonSchemaZod: ZodSchema = z.object({
  name: z
    .string()
    .min(1, { message: "form.content.errors.jsonSchema.required" }),
  type: z.enum(JSONSchemaTypes, {
    message: "form.content.errors.jsonSchema.required",
  }),
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
  items: z.lazy(() => jsonSchemaZod).optional(),
  prefixItems: z.array(z.lazy(() => jsonSchemaZod)).optional(),
  contains: z.lazy(() => jsonSchemaZod).optional(),
  minItems: z.number().optional(),
  maxItems: z.number().optional(),
  uniqueItems: z.boolean().optional(),
  properties: z.lazy(() => z.array(jsonSchemaZod)).optional(),
  minProperties: z.number().optional(),
  maxProperties: z.number().optional(),
});

export type JsonSchemaZod = z.infer<typeof jsonSchemaZod>;

export const defaultJsonSchemaZod: JsonSchemaZod = {
  name: "",
  type: "",
};
