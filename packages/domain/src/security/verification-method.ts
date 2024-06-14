export const verificationMethodTypes = ["Multikey", "JsonWebKey"];
export type VerificationMethodType = (typeof verificationMethodTypes)[number];

export type VerificationMethod = {
  id: string; //Must be a URL
  type: VerificationMethodType;
  controller: string; //Must be a URL that points to the issuer
  expires?: string; //Must be an ISO8601 datetime, once set it's expected to never change
  revoked?: string; //Must be an ISO8601 datetime, once set it's expected to never change
  [key: string]: unknown;
};
