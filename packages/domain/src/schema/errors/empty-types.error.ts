export class EmptyTypesError extends Error {
  constructor(message?: string) {
    super("Types must not be empty" + (message ? ": " + message : ""));
  }
}
