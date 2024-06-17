import {
  OrderDirection,
  Query,
  orderDirections,
  pageSizes,
} from "@models/query";

export function fromUrl<T>(
  searchParams: Record<keyof Query<T>, string | undefined>
): Query<T> {
  const page = isNaN(Number(searchParams.page)) ? 0 : Number(searchParams.page);
  const pageSize = isNaN(Number(searchParams.pageSize))
    ? 10
    : Number(searchParams.pageSize);

  if (!pageSizes.includes(pageSize)) {
    throw new Error(`Invalid page size: ${pageSize}`);
  }

  const query: Query<T> = {
    page,
    pageSize,
  };

  if (searchParams.orderBy) {
    query.orderBy = searchParams.orderBy as keyof T;
  }

  if (searchParams.orderDirection) {
    if (!orderDirections.includes(searchParams.orderDirection)) {
      throw new Error(
        `Invalid order direction: ${searchParams.orderDirection}`
      );
    }
    query.orderDirection = searchParams.orderDirection as OrderDirection;
  }

  return query;
}
