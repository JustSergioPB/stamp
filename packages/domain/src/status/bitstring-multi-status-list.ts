import { BitstringStatusList } from "./bitstring-status-list";
import {
  BitstringStatusListEntry,
  BitstringStatusListEntryBuilder,
} from "./bitstring-status-list-entry";
import { MINIMUM_BITSTRING_SIZE } from "./constants";
import { EncodedList } from "./encoded-list";
import { StatusMessage } from "./status-message";

export class BitstringMultiStatusList {
  readonly type = "BitstringStatusList";
  readonly statusPurpose: string[];
  readonly statusSize: number;
  readonly statusMessage: StatusMessage[];
  private _encodedList: string;

  private constructor(
    statusPurpose: string[],
    statusSize: number,
    statusMessage: StatusMessage[],
    encodedList: string
  ) {
    this.statusPurpose = statusPurpose;
    this.statusSize = statusSize;
    this.statusMessage = statusMessage;
    this._encodedList = encodedList;
  }

  static create(
    messages: string[],
    listSize: number = MINIMUM_BITSTRING_SIZE
  ): BitstringMultiStatusList {
    const statusSize = Math.ceil(Math.log2(messages.length));
    const encodedList = EncodedList.create(listSize, statusSize).toString();
    const statusMessage = messages.map((message, index) => ({
      status: `0x${index}`,
      message,
    }));
    const statusPurpose = messages;
    return new BitstringMultiStatusList(
      statusPurpose,
      statusSize,
      statusMessage,
      encodedList
    );
  }

  static fromProps(props: BitstringStatusList): BitstringMultiStatusList {
    if (!Array.isArray(props.statusPurpose)) {
      throw new Error("The statusPurpose must be an array of strings");
    }
    if (!Array.isArray(props.statusMessage)) {
      throw new Error("The statusMessage must be an array of StatusMessage");
    }
    const statusSize = Math.pow(2, props.statusMessage.length);
    return new BitstringMultiStatusList(
      props.statusPurpose,
      statusSize,
      props.statusMessage,
      props.encodedList
    );
  }

  get encodedList(): string {
    return this._encodedList;
  }

  push(
    statusListCredential: string,
    message: string
  ): BitstringStatusListEntry {
    const status = this.statusMessage.find((m) => m.message === message);

    if (!status) {
      throw new Error("The status message is not valid");
    }

    const encodedList = EncodedList.fromString(this._encodedList);
    const index = encodedList.getFreeIndex();

    if (index === -1) {
      throw new Error("The bitstring is full.");
    }

    encodedList.push(index, parseInt(status.status));
    this._encodedList = encodedList.toString();
    return new BitstringStatusListEntryBuilder(
      status.message,
      index.toString(),
      statusListCredential
    )
      .withStatusMessage(this.statusMessage)
      .build();
  }

  set(
    entry: BitstringStatusListEntry,
    message: string
  ): BitstringStatusListEntry {
    const status = this.statusMessage.find((m) => m.message === message);
    if (!status) {
      throw new Error("The status message is not valid");
    }
    const encodedList = EncodedList.fromString(this._encodedList);
    encodedList.set(Number(entry.statusListIndex), parseInt(status.status));
    return new BitstringStatusListEntryBuilder(
      message,
      entry.statusListIndex,
      entry.statusListCredential
    )
      .withStatusMessage(this.statusMessage)
      .build();
  }

  remove(entry: BitstringStatusListEntry): void {
    const encodedList = EncodedList.fromString(this._encodedList);
    encodedList.set(Number(entry.statusListIndex), 0x0);
    this._encodedList = encodedList.toString();
  }

  validate(entry: BitstringStatusListEntry): boolean {
    const encodedList = EncodedList.fromString(this._encodedList);
    return encodedList.validate(
      Number(entry.statusListIndex),
      parseInt(entry.statusPurpose)
    );
  }
}
