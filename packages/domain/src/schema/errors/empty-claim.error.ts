export class EmptyClaimError extends Error {
  constructor(message?: string) {
    super("Claim must not be empty" + (message ? ": " + message : ""));
  }
}
