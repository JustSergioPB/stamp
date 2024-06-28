import { CredentialSchema } from "@stamp/domain";
import { BaseZod, SecurityZod, StatusZod, ValidityZod } from "../zod";

export type Template = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  credentialSchema?: CredentialSchema;
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
};
