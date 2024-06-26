import {
  OrderDirection,
  Query,
  SearchParam,
  SearchParams,
  pageSizes,
} from "@models/query";

export function searchParamsToQuery<T>(searchParams: SearchParams): Query<T> {
  const { page, pageSize, orderBy, orderDirection } = searchParams;
  return {
    page: parsePage(page),
    pageSize: parsePageSize(pageSize),
    orderBy: parseOrderBy(orderBy),
    orderDirection: parseOrderDirection(orderDirection),
  };
}

function parsePage(param: SearchParam): number {
  let page = 0;

  if (!isNaN(Number(param))) {
    page = Number(param);
  }

  return page;
}

function parsePageSize(param: SearchParam): number {
  let pageSize = 10;

  if (!isNaN(Number(param))) {
    pageSize = Number(param);
  }

  if (!pageSizes.includes(pageSize)) {
    throw new Error(`Invalid page size: ${pageSize}`);
  }

  return pageSize;
}

function parseOrderBy<T>(param: SearchParam): keyof T | undefined {
  let orderBy = undefined;
  if (typeof param === "string") {
    orderBy = param as keyof T;
  }
  return orderBy;
}

function parseOrderDirection(param: SearchParam): OrderDirection | undefined {
  if (Array.isArray(param)) {
    throw new Error(`Multiple order directions not supported: ${param}`);
  }

  if (param === "asc" || param === "desc") {
    return param as OrderDirection;
  }

  return undefined;
}
