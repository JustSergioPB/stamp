export type QueryResult<T> = {
  items: T[];
  count: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
