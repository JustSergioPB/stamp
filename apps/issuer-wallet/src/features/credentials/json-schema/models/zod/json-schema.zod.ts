import { JSONSchemaTypes } from "@stamp/domain";
import { ZodSchema, z } from "zod";

export const jsonSchemaZod: ZodSchema = z.object({
  type: z.enum(JSONSchemaTypes, {
    message: "form.content.errors.jsonSchema.required",
  }),
  required: z.array(z.string()).optional(),
  patternProperties: z.lazy(() => z.array(jsonSchemaZod)).optional(),
  additionalProperties: z.lazy(() => jsonSchemaZod).optional(),
  unevaluatedProperties: z.lazy(() => jsonSchemaZod).optional(),
  items: z.lazy(() => jsonSchemaZod).optional(),
  prefixItems: z.array(z.lazy(() => jsonSchemaZod)).optional(),
  unevaluatedItems: z.lazy(() => jsonSchemaZod).optional(),
  contains: z.lazy(() => jsonSchemaZod).optional(),
  minItems: z.coerce.number().optional(),
  maxItems: z.coerce.number().optional(),
  uniqueItems: z.boolean().optional(),
  minLength: z.coerce.number().optional(),
  maxLength: z.coerce.number().optional(),
  pattern: z.string().optional(),
  enum: z.array(z.unknown()).optional(),
  const: z.unknown().optional(),
  multipleOf: z.coerce.number().optional(),
  minimum: z.coerce.number().optional(),
  exclusiveMinimum: z.boolean().optional(),
  maximum: z.coerce.number().optional(),
  exclusiveMaximum: z.boolean().optional(),
  format: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "form.content.errors.jsonSchema.required" })
    .transform((value) => value ?? undefined),
});

export type JsonSchemaZod = z.infer<typeof jsonSchemaZod>;

export const defaultJsonSchemaZod: JsonSchemaZod = {
  title: "",
  type: "",
  items: {
    type: "string",
    title: "$",
  },
};
