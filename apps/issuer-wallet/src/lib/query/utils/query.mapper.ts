import {
  OrderDirection,
  Query,
  SearchParam,
  SearchParams,
  pageSizes,
} from "../models";

export class QueryMapper {
  static fromURL<T>(data: SearchParams): Query<T> {
    //TODO: Add orgId filtering
    const { page, pageSize, orderBy, orderDirection } = data;
    return {
      page: this.parsePage(page),
      pageSize: this.parsePageSize(pageSize),
      orderBy: this.parseOrderBy(orderBy),
      orderDirection: this.parseOrderDirection(orderDirection),
    };
  }

  private static parsePage(param: SearchParam): number {
    let page = 0;

    if (!isNaN(Number(param))) {
      page = Number(param);
    }

    return page;
  }

  private static parsePageSize(param: SearchParam): number {
    let pageSize = 10;

    if (!isNaN(Number(param))) {
      pageSize = Number(param);
    }

    if (!pageSizes.includes(pageSize)) {
      throw new Error(`Invalid page size: ${pageSize}`);
    }

    return pageSize;
  }

  private static parseOrderBy<T>(param: SearchParam): keyof T | undefined {
    let orderBy = undefined;
    if (typeof param === "string") {
      orderBy = param as keyof T;
    }
    return orderBy;
  }

  private static parseOrderDirection(
    param: SearchParam
  ): OrderDirection | undefined {
    if (Array.isArray(param)) {
      throw new Error(`Multiple order directions not supported: ${param}`);
    }

    if (param === "asc" || param === "desc") {
      return param as OrderDirection;
    }

    return undefined;
  }
}
