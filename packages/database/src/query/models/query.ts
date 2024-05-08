import { InvalidPageSizeError } from "../errors";
import { OrderDirection } from "./order-direction";
import { PAGE_SIZE, PageSize } from "./page-size";

export type Query<T> = {
  page: number;
  pageSize: PageSize;
  orderBy?: keyof T;
  orderDirection?: OrderDirection;
};
