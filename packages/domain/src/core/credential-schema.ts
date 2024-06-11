import { Id } from "./id";
import { Type } from "./types";

export type CredentialSchema = {
  id: Id; //It must be a dereferenceable URL
  type: Type;
  [key: string]: unknown;
};
