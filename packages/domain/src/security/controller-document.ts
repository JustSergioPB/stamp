import { Context } from "../core";
import { VerificationMethod } from "./verification-method";

export type ControllerDocument = {
  id: string;
  "@context": Context;
  verificationMethod?: VerificationMethod[];
  authentication?: (string | VerificationMethod)[];
  assertionMethod?: (string | VerificationMethod)[];
  keyAgreement?: (string | VerificationMethod)[];
  capabilityInvocation?: (string | VerificationMethod)[];
  capabilityDelegation?: (string | VerificationMethod)[];
  [key: string]: unknown;
};
