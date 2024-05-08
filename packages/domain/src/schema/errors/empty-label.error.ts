export class EmptyLabelError extends Error {
  constructor(message?: string) {
    super("Label must not be empty" + (message ? ": " + message : ""));
  }
}
