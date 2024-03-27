import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { SchemaApiService } from 'src/app/services/schema/schema-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';

@Component({
  selector: 'stamp-schemas',
  standalone: true,
  imports: [PaginatorComponent, ProgressBarComponent, CommonModule],
  templateUrl: './schemas.component.html',
  styleUrl: './schemas.component.css',
})
export class SchemasComponent implements OnInit {
  private schemaService = inject(SchemaApiService);
  schemas = toSignal(this.schemaService.schemas$, { initialValue: null });

  ngOnInit(): void {
    this.schemaService.searchSchemas({});
  }

  onPageSizeChange(pageSize: number): void {
    this.schemaService.searchSchemas({ pageSize });
  }

  onPageChange(page: number): void {
    this.schemaService.searchSchemas({ page });
  }
}
