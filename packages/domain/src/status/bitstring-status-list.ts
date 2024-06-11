import { BitstringStatusListEntry } from "./bitstring-status-list-entry";
import { EncodedList } from "./encoded-list";
import { StatusMessage } from "./status-message";
import { BitstringStatusListType } from "./types";

export class BitstringStatusList {
  readonly type: BitstringStatusListType = "BitstringStatusList";
  readonly statusPurpose: string | string[];
  readonly statusSize?: number;
  readonly statusMessage?: StatusMessage[];
  private _encodedList: string;

  constructor(
    statusPurpose: string | string[],
    encodedList?: string,
    listSize?: number
  ) {
    if (Array.isArray(statusPurpose)) {
      this.statusMessage = statusPurpose.map((purpose, index) => {
        return { status: `0x${index}`, message: purpose };
      });
      this.statusSize = statusPurpose.length;
    }
    this.statusPurpose = statusPurpose;
    this._encodedList =
      encodedList || EncodedList.create(listSize, this.statusSize).toString();
  }

  get encodedList(): string {
    return this._encodedList;
  }

  updateEntry(entry: BitstringStatusListEntry, status: number): void {
    const encodedList = EncodedList.fromString(this.encodedList);
    encodedList.setStatus(Number(entry.statusListIndex), status);
    this._encodedList = encodedList.toString();
  }

  validateEntry(entry: BitstringStatusListEntry): boolean {
    const isArray = Array.isArray(this.statusPurpose);

    if (isArray && !this.statusPurpose.includes(entry.statusPurpose)) {
      throw new Error("STATUS_VERIFICATION_ERROR");
    }

    if (!isArray && this.statusPurpose !== entry.statusPurpose) {
      throw new Error("STATUS_VERIFICATION_ERROR");
    }

    const encodedList = EncodedList.fromString(this.encodedList);
    const status = encodedList.getStatus(Number(entry.statusListIndex));
    const message = this.statusMessage?.find(
      (msg) => status === parseInt(msg.status, 16)
    );

    if (!message) {
      throw new Error("STATUS_VERIFICATION_ERROR");
    }

    return entry.statusPurpose === message.message;
  }
}
