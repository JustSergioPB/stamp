export class InvalidPropertyError extends Error {
  constructor(property: string, type: string) {
    super(`Invalid property: ${property} in ${type}`);
  }
}
