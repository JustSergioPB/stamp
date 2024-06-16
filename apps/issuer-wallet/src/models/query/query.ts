import { OrderDirection } from "./order-direction";
import { PageSize } from "./page-size";

export type Query<T> = {
  page: number;
  pageSize: PageSize;
  orderBy?: keyof T;
  orderDirection?: OrderDirection;
};
