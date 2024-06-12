import { BitstringStatusList } from "./bitstring-status-list";
import {
  BitstringStatusListEntry,
  BitstringStatusListEntryBuilder,
} from "./bitstring-status-list-entry";
import { MINIMUM_BITSTRING_SIZE } from "./constants";
import { EncodedList } from "./encoded-list";

export class BitstringSingleStatusList {
  readonly type = "BitstringStatusList";
  readonly statusPurpose: string;
  private _encodedList: string;

  private constructor(statusPurpose: string, encodedList: string) {
    this.statusPurpose = statusPurpose;
    this._encodedList = encodedList;
  }

  static create(
    statusPurpose: string,
    listSize: number = MINIMUM_BITSTRING_SIZE
  ): BitstringSingleStatusList {
    const encodedList = EncodedList.create(listSize).toString();
    return new BitstringSingleStatusList(statusPurpose, encodedList);
  }

  static fromProps(props: BitstringStatusList): BitstringSingleStatusList {
    if (Array.isArray(props.statusPurpose)) {
      throw new Error("The statusPurpose must be a string");
    }
    return new BitstringSingleStatusList(
      props.statusPurpose,
      props.encodedList
    );
  }

  get encodedList(): string {
    return this._encodedList;
  }

  push(statusListCredential: string): BitstringStatusListEntry {
    const encodedList = EncodedList.fromString(this._encodedList);
    const index = encodedList.getFreeIndex();

    if (index === -1) {
      throw new Error("The bitstring is full.");
    }

    encodedList.push(index, 0x1);
    this._encodedList = encodedList.toString();
    return new BitstringStatusListEntryBuilder(
      this.statusPurpose,
      index.toString(),
      statusListCredential
    ).build();
  }

  remove(entry: BitstringStatusListEntry): void {
    const encodedList = EncodedList.fromString(this._encodedList);
    encodedList.set(Number(entry.statusListIndex), 0x0);
    this._encodedList = encodedList.toString();
  }

  validate(entry: BitstringStatusListEntry): boolean {
    const encodedList = EncodedList.fromString(this._encodedList);
    return encodedList.validate(Number(entry.statusListIndex), 0x1);
  }
}
