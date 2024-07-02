export class Nonce {
  static generate(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
