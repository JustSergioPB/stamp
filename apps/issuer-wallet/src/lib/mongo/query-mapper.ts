import { SearchParam, SearchParams, pageSizes } from "@lib/query";
import { FindCursor, WithId } from "mongodb";

export class QueryMapper {
  static map<T>(
    query: SearchParams,
    cursor: FindCursor<WithId<T>>,
    keys: string[]
  ): {
    cursor: FindCursor<WithId<T>>;
    page: number;
    pageSize: number;
  } {
    const page = this.parsePage(query.page);
    const pageSize = this.parsePageSize(query.pageSize);
    const orderBy = this.parseOrderBy(query.orderBy, keys);
    const sort = this.parseSort(query.sort);

    cursor.skip(page * pageSize).limit(pageSize);

    if (orderBy && sort) {
      cursor.sort({ [orderBy]: sort === "asc" ? 1 : -1 });
    }

    return { cursor, page, pageSize };
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

  private static parseOrderBy(
    param: SearchParam,
    keys: string[]
  ): string | null {
    if (Array.isArray(param)) {
      throw new Error(`Multiple order by not supported: ${param}`);
    }

    let orderBy = null;
    if (typeof param === "string" && keys.includes(param)) {
      orderBy = param;
    }

    return orderBy;
  }

  private static parseSort(param: SearchParam): string | null {
    if (Array.isArray(param)) {
      throw new Error(`Multiple order directions not supported: ${param}`);
    }

    if (param === "asc" || param === "desc") {
      return param;
    }

    return null;
  }
}
