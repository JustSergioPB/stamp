import { VerificationMethod } from "./verification-method";

export type MultikeyType = "Multikey";

export type MultikeyVerificationMethod = VerificationMethod & {
  type: MultikeyType;
  publicKeyMultibase: string; // Multibase encoded value
  secretKeyMultibase: string; // Multibase encoded value
};
