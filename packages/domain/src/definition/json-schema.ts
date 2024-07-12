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

export const stringJsonSchemaFormats = [
  "date-time",
  "time",
  "date",
  "duration",
  "email",
  "idn-email",
  "hostname",
  "idn-hostname",
  "ipv4",
  "ipv6",
  "uuid",
  "uri",
  "uri-reference",
  "iri",
  "iri-reference",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
] as const;

export type StringJsonSchemaFormat = (typeof stringJsonSchemaFormats)[number];

export type BaseJsonSchema = {
  $schema?: "https://json-schema.org/draft/2020-12/schema";
  $id?: string;
  $ref?: string;
  $defs?: { [key: string]: JsonSchema };
  type: JsonSchemaType;
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
};

export type NumberJsonSchema = BaseJsonSchema & {
  type: "number" | "integer";
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

export type StringJsonSchema = BaseJsonSchema & {
  type: "string";
  format?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type ObjectJsonSchema = BaseJsonSchema & {
  type: "object";
  properties?: { [key: string]: JsonSchema };
  patternProperties?: { [key: string]: JsonSchema };
  additionalProperties?: boolean | JsonSchema;
  unevaluatedProperties?: boolean | JsonSchema;
  minProperties?: number;
  maxProperties?: number;
  required?: string[];
};

export type ArrayJsonSchema = BaseJsonSchema & {
  type: "array";
  items?: JsonSchema | JsonSchema[];
  prefixItems?: JsonSchema[];
  unevaluatedItems?: boolean | JsonSchema;
  contains?: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
};

export type BooleanJsonSchema = BaseJsonSchema & {
  type: "boolean";
};

export type NullJsonSchema = BaseJsonSchema & {
  type: "null";
};

export type JsonSchema =
  | BaseJsonSchema
  | NumberJsonSchema
  | StringJsonSchema
  | ObjectJsonSchema
  | ArrayJsonSchema
  | BooleanJsonSchema
  | NullJsonSchema;
