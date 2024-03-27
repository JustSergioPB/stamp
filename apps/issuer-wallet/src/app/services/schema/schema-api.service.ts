import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schema, SchemaJson, SchemaQuery } from '@domain/schema';
import { Page } from '@domain/page';
import { BehaviorSubject, take, tap } from 'rxjs';
import { environment } from 'src/envs/env.dev';

@Injectable({
  providedIn: 'root',
})
export class SchemaApiService {
  private _schema$ = new BehaviorSubject<Schema | null>(null);
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

  searchSchemas(query: SchemaQuery): void {
    this.httpClient
      .get<Page<SchemaJson>>(`${environment.apiUrl}/schemas`, {
        params: {
          page: query.page.toString(),
          pageSize: query.pageSize,
        },
      })
      .pipe(
        tap((schemas) =>
          this._schemas$.next({
            items: schemas.items.map(Schema.fromJson),
            page: schemas.page,
            pageSize: schemas.pageSize,
            count: schemas.count,
          }),
        ),
        take(1),
      )
      .subscribe();
  }
}
