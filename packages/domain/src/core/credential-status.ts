import { Type } from "../core/types";
import { Id } from "../core/id";

export type CredentialStatus = {
  id?: Id;
  type: Type;
  [key: string]: unknown;
};
