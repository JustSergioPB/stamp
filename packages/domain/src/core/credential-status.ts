import { Type } from "typescript";
import { Id } from "./id";

export type CredentialStatus = {
  id?: Id;
  type: Type;
  [key: string]: unknown;
};
