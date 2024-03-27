export type SchemaQueryJson = {
  pageSize: number;
  page: number;
};
export class SchemaQuery {
  readonly pageSize: number;
  readonly page: number;
  static readonly pageSizes = [10, 25, 50, 100];

  constructor(pageSize: number = SchemaQuery.pageSizes[0], page: number = 0) {
    if (SchemaQuery.pageSizes.indexOf(pageSize) === -1) {
      throw new Error("Invalid page size");
    }
    this.pageSize = pageSize;
    this.page = page;
  }

  toJson(): SchemaQueryJson {
    return {
      pageSize: this.pageSize,
      page: this.page,
    };
  }
}
