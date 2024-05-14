export class InvalidPageSizeError extends Error {
  constructor(pageSize: number) {
    super(`Invalid page size: ${pageSize}`);
  }
}
