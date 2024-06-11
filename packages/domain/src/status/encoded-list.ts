import { MINIMUM_BITSTRING_SIZE } from "./constants";
import * as zlib from "zlib";
import base64url from "base64url";

export class EncodedList {
  private _bitstring: Uint8Array;
  private _statusSize: number;

  private constructor(bitstring: Uint8Array, statusSize: number = 1) {
    this._bitstring = bitstring;
    this._statusSize = statusSize;
  }

  setStatus(index: number, status: number): void {
    const currentStatus = this.getStatus(index);
    if (currentStatus !== 0) {
      throw new Error("The bit position is already set.");
    }

    const bitStart = Number(index) * this._statusSize;
    const byteStart = Math.floor(bitStart / 8);
    const bitOffset = bitStart % 8;

    for (let i = 0; i < this._statusSize; i++) {
      const bitIndex = bitOffset + i;
      const byteIndex = byteStart + Math.floor(bitIndex / 8);
      const bitPos = bitIndex % 8;

      if (status & (1 << i)) {
        this._bitstring[byteIndex] |= 1 << bitPos;
      } else {
        this._bitstring[byteIndex] &= ~(1 << bitPos);
      }
    }
  }

  getStatus(index: number): number {
    const bitStart = index * this._statusSize;
    const byteStart = Math.floor(bitStart / 8);
    const bitOffset = bitStart % 8;
    let status = 0;

    for (let i = 0; i < this._statusSize; i++) {
      const bitIndex = bitOffset + i;
      const byteIndex = byteStart + Math.floor(bitIndex / 8);
      const bitPos = bitIndex % 8;

      if (this._bitstring[byteIndex] & (1 << bitPos)) {
        status |= 1 << i;
      }
    }

    return status;
  }

  removeStatus(index: number): void {
    const bitStart = index * this._statusSize;
    const byteStart = Math.floor(bitStart / 8);
    const bitOffset = bitStart % 8;

    for (let i = 0; i < this._statusSize; i++) {
      const bitIndex = bitOffset + i;
      const byteIndex = byteStart + Math.floor(bitIndex / 8);
      const bitPos = bitIndex % 8;

      this._bitstring[byteIndex] &= ~(1 << bitPos);
    }
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
    const compressedBuffer = base64url.decode(encodedList);
    const decompressedBuffer = zlib.gunzipSync(Buffer.from(compressedBuffer));
    const bitstring = new Uint8Array(decompressedBuffer.buffer);
    return new EncodedList(bitstring);
  }

  toString(): string {
    const buffer = Buffer.from(this._bitstring.buffer);
    const compressed = zlib.gzipSync(buffer);
    return base64url(compressed);
  }
}
