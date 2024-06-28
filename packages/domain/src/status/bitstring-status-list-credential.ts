import { Context } from "../core";
import { BitstringStatusList } from "./bitstring-status-list";
import { BitstringStatusListCredentialType } from "./types";

export interface BitstringStatusListCredential {
  "@context": Context;
  id: string; //It must be a dereferenceable URL
  type: BitstringStatusListCredentialType;
  validFrom?: string;
  validUntil?: string;
  credentialSubject: BitstringStatusList;
}
