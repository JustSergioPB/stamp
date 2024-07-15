import { Type } from "./types";

export type CredentialSchema = {
  id: string; //It must be a dereferenceable URL
  type: Type;
  [key: string]: unknown;
};
