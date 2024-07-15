import { JSONSchemaTypes, stringJsonSchemaFormats } from "@stamp/domain";
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
  required: z.boolean().optional(),
});

export type BaseJsonSchemaZod = z.infer<typeof baseJsonSchemaZod>;

export const stringJsonSchemaZod = baseJsonSchemaZod.extend({
  format: z.enum(stringJsonSchemaFormats).optional(),
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

type RObjectJsonSchemaZod = z.infer<typeof baseJsonSchemaZod> & {
  properties?: JsonSchemaZod[];
  patternProperties?: JsonSchemaZod[];
  additionalProperties?: JsonSchemaZod;
  unevaluatedProperties?: JsonSchemaZod;
};

export const objectJsonSchemaZod: z.ZodSchema<RObjectJsonSchemaZod> =
  baseJsonSchemaZod.extend({
    properties: z.lazy(() => jsonSchemaZod.array()).optional(),
    patternProperties: z.lazy(() => jsonSchemaZod.array()).optional(),
    additionalProperties: z.lazy(() => jsonSchemaZod).optional(),
    unevaluatedProperties: z.lazy(() => jsonSchemaZod).optional(),
  });

export type ObjectJsonSchemaZod = z.infer<typeof objectJsonSchemaZod>;

type RArrayJsonSchemaZod = z.infer<typeof baseJsonSchemaZod> & {
  items?: JsonSchemaZod;
  prefixItems?: JsonSchemaZod[];
  unevaluatedItems?: JsonSchemaZod;
  contains?: JsonSchemaZod;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
};

export const arrayJsonSchemaZod: z.ZodSchema<RArrayJsonSchemaZod> =
  baseJsonSchemaZod.extend({
    items: z.lazy(() => jsonSchemaZod).optional(),
    prefixItems: z.lazy(() => jsonSchemaZod.array()).optional(),
    unevaluatedItems: z.lazy(() => jsonSchemaZod).optional(),
    contains: z.lazy(() => jsonSchemaZod).optional(),
    minItems: z.coerce.number().optional(),
    maxItems: z.coerce.number().optional(),
    uniqueItems: z.boolean().optional(),
  });

export type ArrayJsonSchemaZod = z.infer<typeof arrayJsonSchemaZod>;

export const nullJsonSchemaZod = baseJsonSchemaZod.extend({
  type: z.literal("null"),
});

export type NullJsonSchemaZod = z.infer<typeof nullJsonSchemaZod>;

export const booleanJsonSchemaZod = baseJsonSchemaZod.extend({
  type: z.literal("boolean"),
});

export const jsonSchemaZod = z.union([
  stringJsonSchemaZod,
  numberJsonSchemaZod,
  objectJsonSchemaZod,
  arrayJsonSchemaZod,
  nullJsonSchemaZod,
  booleanJsonSchemaZod,
]);

export type JsonSchemaZod = z.infer<typeof jsonSchemaZod>;

export const defaultJsonSchemaZod: JsonSchemaZod = {
  title: "",
  type: "string",
};
