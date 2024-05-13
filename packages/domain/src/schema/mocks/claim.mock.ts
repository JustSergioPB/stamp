import { ClaimPrimitive } from "../models";
import {
  VACCINE_NAME_SCHEMA_NODE_MOCK,
  VACCINE_ILLNESS_SCHEMA_NODE_MOCK,
  VACCINE_CODE_SCHEMA_NODE_MOCK,
  VACCINE_DATE_SCHEMA_NODE_MOCK,
  BREED_SCHEMA_NODE_MOCK,
  VACCINES_SCHEMA_NODE_MOCK,
} from "./schema-node.mock";

export const VACCINE_RECORD_CLAIM_MOCK: ClaimPrimitive = {
  name: VACCINE_NAME_SCHEMA_NODE_MOCK,
  illness: VACCINE_ILLNESS_SCHEMA_NODE_MOCK,
  code: VACCINE_CODE_SCHEMA_NODE_MOCK,
  date: VACCINE_DATE_SCHEMA_NODE_MOCK,
};

export const PET_PASSPORT_CLAIM_MOCK: ClaimPrimitive = {
  breed: BREED_SCHEMA_NODE_MOCK,
  vaccines: VACCINES_SCHEMA_NODE_MOCK,
};

export const NON_SANITIZED_PET_PASSPORT_CLAIM_MOCK: ClaimPrimitive = {
  "Bre   ed": BREED_SCHEMA_NODE_MOCK,
  vaccines: VACCINES_SCHEMA_NODE_MOCK,
};

export const EMPTY_CLAIM: ClaimPrimitive = {};