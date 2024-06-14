import { Base64UrlNoPadDecoder, Base64UrlNoPadEncoder } from "../security";
import { MINIMUM_BITSTRING_SIZE } from "./constants";
import * as zlib from "zlib";

export class EncodedList {
  private _bitstring: Uint8Array;
  private _statusSize: number;

  private constructor(bitstring: Uint8Array, statusSize: number = 1) {
    this._bitstring = bitstring;
    this._statusSize = statusSize;
  }

  static create(
    listSize: number = MINIMUM_BITSTRING_SIZE,
    statusSize: number = 1
  ): EncodedList {
    if (listSize < MINIMUM_BITSTRING_SIZE) {
      throw new Error(
        `The size of the bitstring must be at least ${MINIMUM_BITSTRING_SIZE} bytes`
      );
    }

    const bitstring = new Uint8Array(Math.ceil((listSize * statusSize) / 8));
    return new EncodedList(bitstring, statusSize);
  }

  static fromString(encodedList: string): EncodedList {
    const compressedBuffer = new Base64UrlNoPadDecoder().decode(encodedList);
    const decompressedBuffer = zlib.gunzipSync(Buffer.from(compressedBuffer));
    const bitstring = new Uint8Array(decompressedBuffer.buffer);
    return new EncodedList(bitstring);
  }

  push(index: number, status: number): void {
    if (!this.isFree(index)) {
      throw new Error("The bit position is already set.");
    }
    this.set(index, status);
  }

  set(index: number, status: number): void {
    this._bitstring[index * this._statusSize] = status;
  }

  isFree(index: number): boolean {
    return this._bitstring[index * this._statusSize] !== 0;
  }

  getFreeIndex(): number {
    return this._bitstring.findIndex((status) => status === 0);
  }

  validate(index: number, status: number): boolean {
    return this._bitstring[index * this._statusSize] === status;
  }

  toString(): string {
    const buffer = Buffer.from(this._bitstring.buffer);
    const compressed = zlib.gzipSync(buffer);
    return new Base64UrlNoPadEncoder().encode(compressed);
  }
}
