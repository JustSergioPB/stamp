import { Type } from "../core/types";

export type CredentialStatus = {
  id?: string;
  type: Type;
  [key: string]: unknown;
};
