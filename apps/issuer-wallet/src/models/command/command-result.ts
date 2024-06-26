export type CommandResult<T> = {
  data: T | null;
  errorCode: string | null;
};
