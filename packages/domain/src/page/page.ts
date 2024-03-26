import { PageSize } from './page-size';

export type Page<T> = {
  items: T[];
  page: number;
  pageSize: PageSize;
  totalItems: number;
};
