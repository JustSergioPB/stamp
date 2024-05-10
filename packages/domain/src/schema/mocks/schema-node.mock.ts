import { SchemaNodePrimitive } from "../models";

export const VACCINE_NAME_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Name",
  type: "string",
};

export const VACCINE_ILLNESS_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Illness",
  type: "string",
};

export const VACCINE_CODE_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Code",
  type: "string",
};

export const VACCINE_DATE_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Date",
  type: "string",
};

export const BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  type: "list",
  subtype: "string",
};

export const NON_SANITIZED_BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  type: "list",
  subtype: "string",
  properties: {},
};

export const INVALID_BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  type: "list",
  subtype: "string",
  types: [],
};

export const VACCINES_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Vaccines",
  type: "list",
  subtype: "object",
  properties: {
    name: VACCINE_NAME_SCHEMA_NODE_MOCK,
    illness: VACCINE_ILLNESS_SCHEMA_NODE_MOCK,
    code: VACCINE_CODE_SCHEMA_NODE_MOCK,
    date: VACCINE_DATE_SCHEMA_NODE_MOCK,
  },
};
