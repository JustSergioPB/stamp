import { Base58BtcEncoder, Base64UrlNoPadEncoder } from "./encoder";

export class Decoder {
  private _sourceBase: number;
  private _baseAlphabet: string;

  constructor(sourceBase: number, baseAlphabet: string) {
    this._sourceBase = sourceBase;
    this._baseAlphabet = baseAlphabet;
  }

  decode(sourceEncoded: string): Uint8Array {
    // build the base-alphabet to integer value map
    const baseMap: { [key: string]: number } = {};
    for (let i = 0; i < this._baseAlphabet.length; i++) {
      baseMap[this._baseAlphabet[i]] = i;
    }

    // skip and count zero-byte values in the sourceEncoded
    let sourceOffset = 0;
    let zeroes = 0;
    let decodedLength = 0;
    while (sourceEncoded[sourceOffset] === this._baseAlphabet[0]) {
      zeroes++;
      sourceOffset++;
    }

    // allocate the decoded byte array
    const baseContractionFactor = Math.log(this._sourceBase) / Math.log(256);
    const decodedSize = Math.floor(
      (sourceEncoded.length - sourceOffset) * baseContractionFactor + 1
    );
    const decodedBytes = new Uint8Array(decodedSize);

    // perform base-conversion on the source encoding
    while (sourceEncoded[sourceOffset]) {
      // process each base-encoded number
      let carry = baseMap[sourceEncoded[sourceOffset]];

      // convert the base-encoded number by performing base-expansion
      let i = 0;
      for (
        let byteOffset = decodedSize - 1;
        (carry !== 0 || i < decodedLength) && byteOffset !== -1;
        byteOffset--, i++
      ) {
        carry += Math.floor(this._sourceBase * decodedBytes[byteOffset]);
        decodedBytes[byteOffset] = Math.floor(carry % 256);
        carry = Math.floor(carry / 256);
      }

      decodedLength = i;
      sourceOffset++;
    }

    // skip leading zeros in the decoded byte array
    let decodedOffset = decodedSize - decodedLength;
    while (decodedOffset !== decodedSize && decodedBytes[decodedOffset] === 0) {
      decodedOffset++;
    }

    // create the final byte array that has been base-decoded
    const finalBytes = new Uint8Array(zeroes + (decodedSize - decodedOffset));
    let j = zeroes;
    while (decodedOffset !== decodedSize) {
      finalBytes[j++] = decodedBytes[decodedOffset++];
    }

    return finalBytes;
  }
}

export class Base64UrlNoPadDecoder extends Decoder {
  constructor() {
    super(Base64UrlNoPadEncoder.base, Base64UrlNoPadEncoder.alphabet);
  }
}

export class Base58BtcDecoder extends Decoder {
  constructor() {
    super(Base58BtcEncoder.base, Base58BtcEncoder.alphabet);
  }
}
