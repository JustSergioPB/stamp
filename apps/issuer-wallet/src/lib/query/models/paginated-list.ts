export type PaginatedList<T> = {
  items: T[];
  count: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
