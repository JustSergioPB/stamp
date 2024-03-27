import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Schema,
  SchemaJson,
  SchemaQuery,
  SchemaQueryJson,
} from '@domain/schema';
import { Page } from '@domain/page';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/envs/env.dev';

@Injectable({
  providedIn: 'root',
})
export class SchemaApiService {
  private _schema$ = new BehaviorSubject<Schema | null>(null);
  private _query$ = new BehaviorSubject<SchemaQuery>(new SchemaQuery());
  private _schemas$ = new BehaviorSubject<Page<Schema> | null>(null);

  schema$ = this._schema$.asObservable();
  schemas$ = this._schemas$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getSchema(id: string): void {
    this.httpClient
      .get<SchemaJson>(`${environment.apiUrl}/schema/${id}`)
      .pipe(
        tap((schema) => this._schema$.next(Schema.fromJson(schema))),
        take(1),
      )
      .subscribe();
  }

  searchSchemas(query: Partial<SchemaQueryJson>): void {
    const { pageSize, page } = this._query$.getValue();
    this._query$.next(
      new SchemaQuery(query.pageSize ?? pageSize, query.page ?? page),
    );
    this._schemas$.next(null);
    this._query$
      .asObservable()
      .pipe(
        switchMap((query) =>
          this.httpClient.get<Page<SchemaJson>>(
            `${environment.apiUrl}/schemas`,
            { params: query.toJson() },
          ),
        ),
        tap(({ items, ...rest }) =>
          this._schemas$.next({
            items: items.map(Schema.fromJson),
            ...rest,
          }),
        ),
        take(1),
      )
      .subscribe();
  }
}
