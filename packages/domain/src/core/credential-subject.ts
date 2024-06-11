import { Id } from "./id";

export type CredentialSubject = {
  id?: Id;
  [key: string]: unknown;
};
