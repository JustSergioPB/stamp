import { VerificationMethod } from "./verification-method";

export type JWKVerificationMethodType = "JsonWebKey";

export type JWKVerificationMethod = VerificationMethod & {
  type: JWKVerificationMethodType;
  publicKeyJwk?: JsonWebKey;
  secretKeyJwk?: JsonWebKey;
};

export type JsonWebKey = {
  kty: string;
  use: string;
  key_ops: string[];
  alg: string;
  kid: string;
  x5c?: string[];
  x5t?: string;
  [key: string]: unknown;
};
