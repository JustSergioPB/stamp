import { JsonSchema } from "./json-schema";

export type CredentialSubjectJsonSchema = {
  type: "object";
  properties: { [key: string]: JsonSchema };
  required: string[];
};
