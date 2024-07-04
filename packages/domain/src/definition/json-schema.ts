export const JSONSchemaTypes = [
  "string",
  "number",
  "integer",
  "boolean",
  "object",
  "array",
  "null",
] as const;

export type JsonSchemaType = (typeof JSONSchemaTypes)[number];

export type JsonSchema = {
  $schema?: "https://json-schema.org/draft/2020-12/schema";
  $id?: string;
  $ref?: string;
  $defs?: { [key: string]: JsonSchema };
  type?: JsonSchemaType;
  $comment?: string;
  examples?: unknown[];
  default?: unknown;
  title?: string;
  description?: string;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
  const?: unknown;
  enum?: unknown[];

  // === OBJECT ===
  properties?: { [key: string]: JsonSchema };
  patternProperties?: { [key: string]: JsonSchema };
  additionalProperties?: boolean | JsonSchema;
  unevaluatedProperties?: boolean | JsonSchema;
  minProperties?: number;
  maxProperties?: number;
  required?: string[];

  // === ARRAY ===
  items?: JsonSchema | JsonSchema[];
  prefixItems?: JsonSchema[];
  unevaluatedItems?: boolean | JsonSchema;
  contains?: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;

  // === STRING ===
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;

  // === NUMBER / INTEGER ===
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};
