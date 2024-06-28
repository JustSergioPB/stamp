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
  $schema?: string;
  $id?: string;
  $ref?: string;
  $defs?: { [key: string]: JsonSchema };
  type?: JsonSchemaType;
  properties?: { [key: string]: JsonSchema };
  patternProperties?: { [key: string]: JsonSchema };
  additionalProperties?: boolean | JsonSchema;
  unevaluatedProperties?: boolean | JsonSchema;
  items?: JsonSchema | JsonSchema[];
  prefixItems?: JsonSchema[];
  unevaluatedItems?: boolean | JsonSchema;
  contains?: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: unknown[];
  const?: unknown;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  format?: string;
  $comment?: string;
  examples?: unknown[];
  default?: unknown;
  title?: string;
  description?: string;
  required?: string[];
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
};
