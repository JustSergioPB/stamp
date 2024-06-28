export const proofPurpose = [
  "authentication",
  "assertionMethod",
  "keyAgreement",
  "capabilityInvocation",
  "capabilityDelegation",
];
export type ProofPurpose = (typeof proofPurpose)[number];
