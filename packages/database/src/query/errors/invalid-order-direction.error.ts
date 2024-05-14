export class InvalidOrderDirectionError extends Error {
  constructor(direction: string) {
    super(`Invalid order direction: ${direction}`);
  }
}
