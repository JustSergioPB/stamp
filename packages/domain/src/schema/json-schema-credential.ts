import { JsonSchemaCredentialSubject } from "./json-schema-credential-subject";
import { JsonSchemaCredentialType } from "./types";

export type JsonSchemaCredential = {
  id: string;
  type: JsonSchemaCredentialType;
  credentialSubject: JsonSchemaCredentialSubject;
};
