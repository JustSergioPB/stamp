import { SchemaPrimitive } from "../models/schema";
import { PET_PASSPORT_CLAIM_MOCK } from "./claim.mock";

export const INVALID_PET_PASSPORT_SCHEMA_MOCK: SchemaPrimitive = {
  name: "Pet passport",
  types: [],
  credentialSubject: {},
  status: "private",
  version: 0,
  lang: "en",
  createdAt: new Date(2024, 25, 4),
  modifiedAt: new Date(2024, 25, 4),
};

export const PET_PASSPORT_SCHEMA_MOCK: SchemaPrimitive = {
  name: "Pet passport",
  types: ["VerifiableCredential"],
  credentialSubject: PET_PASSPORT_CLAIM_MOCK,
  status: "private",
  version: 0,
  lang: "en",
  createdAt: new Date(2024, 25, 4),
  modifiedAt: new Date(2024, 25, 4),
};

export const NON_SANITIZED_PET_PASSPORT_SCHEMA_MOCK: SchemaPrimitive = {
  name: "Pet passport",
  types: ["VerifiableCredential", ""],
  credentialSubject: PET_PASSPORT_CLAIM_MOCK,
  status: "private",
  version: 0,
  lang: "en",
  createdAt: new Date(2024, 25, 4),
  modifiedAt: new Date(2024, 25, 4),
};
