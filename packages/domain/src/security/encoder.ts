export class Encoder {
  private _targetBase: number;
  private _baseAlphabet: string;

  constructor(targetBase: number, baseAlphabet: string) {
    this._targetBase = targetBase;
    this._baseAlphabet = baseAlphabet;
  }

  encode(bytes: Uint8Array): string {
    let zeroes = 0;
    let length = 0;
    let begin = 0;
    const end = bytes.length;

    // count the number of leading bytes that are zero
    while (begin !== end && bytes[begin] === 0) {
      begin++;
      zeroes++;
    }

    // allocate enough space to store the target base value
    const baseExpansionFactor = Math.log(256) / Math.log(this._targetBase);
    const size = Math.floor((end - begin) * baseExpansionFactor + 1);
    const baseValue = new Uint8Array(size);

    // process the entire input byte array
    while (begin !== end) {
      let carry = bytes[begin];

      // for each byte in the array, perform base-expansion
      let i = 0;
      for (
        let basePosition = size - 1;
        (carry !== 0 || i < length) && basePosition !== -1;
        basePosition--, i++
      ) {
        carry += Math.floor(256 * baseValue[basePosition]);
        baseValue[basePosition] = Math.floor(carry % this._targetBase);
        carry = Math.floor(carry / this._targetBase);
      }

      length = i;
      begin++;
    }

    // skip leading zeroes in base-encoded result
    let baseEncodingPosition = size - length;
    while (
      baseEncodingPosition !== size &&
      baseValue[baseEncodingPosition] === 0
    ) {
      baseEncodingPosition++;
    }

    // convert the base value to the base encoding
    let baseEncoding = this._baseAlphabet.charAt(0).repeat(zeroes);
    for (; baseEncodingPosition < size; ++baseEncodingPosition) {
      baseEncoding += this._baseAlphabet.charAt(
        baseValue[baseEncodingPosition]
      );
    }

    return baseEncoding;
  }
}

export class Base64UrlNoPadEncoder extends Encoder {
  static alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  static base = 64;

  constructor() {
    super(Base64UrlNoPadEncoder.base, Base64UrlNoPadEncoder.alphabet);
  }
}

export class Base58BtcEncoder extends Encoder {
  static alphabet =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  static base = 58;
  constructor() {
    super(Base58BtcEncoder.base, Base58BtcEncoder.alphabet);
  }
}
