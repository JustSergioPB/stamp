import { PaginatedList } from "./paginated-list";

export type SearchResult<T> = {
  data: PaginatedList<T> | null;
  errorCode: string | null;
};
