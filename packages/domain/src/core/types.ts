export type Type = string | string[]; //It can be any word or a dereferenceable URL to a JSON-LD context, for the moment we are only using words
export type VerifiableCredentialType =
  | "VerifiableCredential"
  | ["VerifiableCredential", ...string[]];
export type VerifiablePresentationType =
  | "VerifiablePresentation"
  | ["VerifiablePresentation", ...string[]];
export type EnvelopedVerifiableCredentialType = "EnvelopedVerifiableCredential";
export type EnvelopedVerifiablePresentationType =
  "EnvelopedVerifiablePresentation";
