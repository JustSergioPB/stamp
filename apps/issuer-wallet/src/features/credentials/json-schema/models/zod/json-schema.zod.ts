import { JSONSchemaTypes } from "@stamp/domain";
import { z } from "zod";

export const baseJsonSchemaZod = z.object({
  type: z.enum(JSONSchemaTypes, {
    message: "form.content.errors.jsonSchema.required",
  }),
  const: z.unknown().optional(),
  enum: z.array(z.unknown()).optional(),
  title: z
    .string()
    .min(1, { message: "form.content.errors.jsonSchema.required" }),
});

export type BaseJsonSchemaZod = z.infer<typeof baseJsonSchemaZod>;

export const stringJsonSchemaZod = baseJsonSchemaZod.extend({
  format: z.string().optional(),
  minLength: z.coerce.number().optional(),
  maxLength: z.coerce.number().optional(),
  pattern: z.string().optional(),
});

export type StringJsonSchemaZod = z.infer<typeof stringJsonSchemaZod>;

export const numberJsonSchemaZod = baseJsonSchemaZod.extend({
  multipleOf: z.coerce.number().optional(),
  minimum: z.coerce.number().optional(),
  exclusiveMinimum: z.boolean().optional(),
  maximum: z.coerce.number().optional(),
  exclusiveMaximum: z.boolean().optional(),
});

export type NumberJsonSchemaZod = z.infer<typeof numberJsonSchemaZod>;

export const baseObjectJsonSchemaZod = baseJsonSchemaZod.extend({
  required: z.array(z.string()).optional(),
});

type RObjectJsonSchemaZod = z.infer<typeof baseObjectJsonSchemaZod> & {
  properties?: RObjectJsonSchemaZod[];
  patternProperties?: RObjectJsonSchemaZod[];
  additionalProperties?: RObjectJsonSchemaZod;
  unevaluatedProperties?: RObjectJsonSchemaZod;
};

export const objectJsonSchemaZod: z.ZodSchema<RObjectJsonSchemaZod> =
  baseObjectJsonSchemaZod.extend({
    properties: z.lazy(() => objectJsonSchemaZod.array()).optional(),
    patternProperties: z.lazy(() => objectJsonSchemaZod.array()).optional(),
    additionalProperties: z.lazy(() => objectJsonSchemaZod).optional(),
    unevaluatedProperties: z.lazy(() => objectJsonSchemaZod).optional(),
  });

export type ObjectJsonSchemaZod = z.infer<typeof objectJsonSchemaZod>;

export const arrayJsonSchemaZod = baseJsonSchemaZod.extend({
  items: objectJsonSchemaZod.optional(),
  prefixItems: z.array(objectJsonSchemaZod).optional(),
  unevaluatedItems: objectJsonSchemaZod.optional(),
  contains: objectJsonSchemaZod.optional(),
  minItems: z.coerce.number().optional(),
  maxItems: z.coerce.number().optional(),
  uniqueItems: z.boolean().optional(),
});

export type ArrayJsonSchemaZod = z.infer<typeof arrayJsonSchemaZod>;

export const jsonSchemaZod = z.union([
  baseJsonSchemaZod,
  stringJsonSchemaZod,
  numberJsonSchemaZod,
  objectJsonSchemaZod,
  arrayJsonSchemaZod,
]);

export type JsonSchemaZod = z.infer<typeof jsonSchemaZod>;

export const defaultJsonSchemaZod: JsonSchemaZod = {
  title: "",
  type: "string",
};
