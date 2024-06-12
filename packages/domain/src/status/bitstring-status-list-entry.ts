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

export class BitstringStatusListEntryBuilder {
  private _entry: BitstringStatusListEntry;
  constructor(
    statusPurpose: string,
    statusListIndex: string,
    statusListCredential: string
  ) {
    this._entry = {
      type: "BitstringStatusListEntry",
      statusPurpose,
      statusListIndex,
      statusListCredential,
    };
  }

  withId(id: string): BitstringStatusListEntryBuilder {
    this._entry.id = id;
    return this;
  }

  withStatusMessage(
    statusMessage: StatusMessage[]
  ): BitstringStatusListEntryBuilder {
    this._entry.statusSize = Math.pow(2, statusMessage.length);
    this._entry.statusMessage = statusMessage;
    return this;
  }

  withStatusReference(
    statusReference: string | string[]
  ): BitstringStatusListEntryBuilder {
    this._entry.statusReference = statusReference;
    return this;
  }

  build(): BitstringStatusListEntry {
    return this._entry;
  }
}
