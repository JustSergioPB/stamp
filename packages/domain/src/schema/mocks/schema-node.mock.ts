import { SchemaNodePrimitive } from "../models";

export const VACCINE_NAME_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Name",
  valueType: "string",
};

export const VACCINE_ILLNESS_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Illness",
  valueType: "string",
};

export const VACCINE_CODE_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Code",
  valueType: "string",
};

export const VACCINE_DATE_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Date",
  valueType: "string",
};

export const BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  valueType: "list",
  valueSubtype: "string",
};

export const NON_SANITIZED_BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  valueType: "list",
  valueSubtype: "string",
  properties: {},
};

export const INVALID_BREED_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Breed",
  valueType: "list",
  valueSubtype: "string",
  types: [],
};

export const VACCINES_SCHEMA_NODE_MOCK: SchemaNodePrimitive = {
  label: "Vaccines",
  valueType: "list",
  valueSubtype: "object",
  properties: {
    name: VACCINE_NAME_SCHEMA_NODE_MOCK,
    illness: VACCINE_ILLNESS_SCHEMA_NODE_MOCK,
    code: VACCINE_CODE_SCHEMA_NODE_MOCK,
    date: VACCINE_DATE_SCHEMA_NODE_MOCK,
  },
};
