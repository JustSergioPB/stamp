export type ActionResult<T> = {
  data: T | null;
  errorCode: string | null;
};
