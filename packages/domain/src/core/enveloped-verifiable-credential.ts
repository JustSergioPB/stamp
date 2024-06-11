import { EnvelopedVerifiableCredentialType } from "./types";

export type EnvelopedVerifiableCredential = {
  "@context": string;
  id: string;
  type: EnvelopedVerifiableCredentialType;
};
