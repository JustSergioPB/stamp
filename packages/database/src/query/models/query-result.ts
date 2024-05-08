export type QueryResult<T> = {
  items: T[];
  count: number;
  currentPage: number;
  totalPages: number;
};
