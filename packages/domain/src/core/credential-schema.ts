import { Type } from "typescript";
import { Id } from "./id";

export type CredentialSchema = {
  id: Id; //It must be a dereferenceable URL
  type: Type;
  [key: string]: unknown;
};
