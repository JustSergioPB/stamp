import { InvalidOrderDirectionError, InvalidPageSizeError } from "../errors";
import { ORDER_DIRECTION, OrderDirection, PAGE_SIZE } from "../models";
import { Query } from "../models/query";

export function fromUrl<T>(
  searchParams: Record<keyof Query<T>, string | undefined>
): Query<T> {
  const page = isNaN(Number(searchParams.page)) ? 0 : Number(searchParams.page);
  const pageSize = isNaN(Number(searchParams.pageSize))
    ? 10
    : Number(searchParams.pageSize);

  if (!PAGE_SIZE.includes(pageSize)) {
    throw new InvalidPageSizeError(pageSize);
  }

  const query: Query<T> = {
    page,
    pageSize,
  };

  if (searchParams.orderBy) {
    query.orderBy = searchParams.orderBy as keyof T;
  }

  if (searchParams.orderDirection) {
    if (!ORDER_DIRECTION.includes(searchParams.orderDirection)) {
      throw new InvalidOrderDirectionError(searchParams.orderDirection);
    }
    query.orderDirection = searchParams.orderDirection as OrderDirection;
  }

  return query;
}
