import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { SchemaQuery } from '@domain/schema';
import { SchemaApiService } from 'src/app/services/schema/schema-api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'stamp-schemas',
  standalone: true,
  imports: [PaginatorComponent, CommonModule],
  templateUrl: './schemas.component.html',
  styleUrl: './schemas.component.css',
})
export class SchemasComponent implements OnInit {
  private schemaService = inject(SchemaApiService);
  schemas = toSignal(this.schemaService.schemas$, { initialValue: null });

  ngOnInit(): void {
    this.schemaService.searchSchemas(new SchemaQuery());
  }
}
