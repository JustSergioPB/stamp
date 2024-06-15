export type JsonSchemaCredentialSubject = {
  $id: string;
  $schema: string;
  title?: string;
  description?: string;
  lang?: string;
  dir?: string;
  type: "object";
  properties: {
    credentialSubject: object;
  };
  required: ["credentialSubject"];
};
