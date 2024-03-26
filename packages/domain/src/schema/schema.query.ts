import { PageSize, pageSizes } from "../page/page-size";

export class SchemaQuery {
  readonly pageSize: PageSize;
  readonly page: number;

  constructor(pageSize: PageSize = pageSizes[0], page: number = 0) {
    this.pageSize = pageSize;
    this.page = page;
  }
}
