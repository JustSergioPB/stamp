import { StatusMessage } from "./status-message";
import { BitstringStatusListEntryType } from "./types";

export type BitstringStatusListEntry = {
  id?: string;
  type: BitstringStatusListEntryType;
  statusPurpose: string; // revocation | suspension | message where message is a human readable message ex: active
  statusListIndex: string;
  statusListCredential: string;
  statusSize?: number;
  statusMessage?: StatusMessage[];
  statusReference?: string | string[]; //It must be a dereferenceable URL
};
