import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { SchemaApiService } from 'src/app/services/schema/schema-api.service';

@Component({
  selector: 'stamp-schemas',
  standalone: true,
  imports: [PaginatorComponent, CommonModule],
  templateUrl: './schemas.component.html',
  styleUrl: './schemas.component.css',
})
export class SchemasComponent {
  constructor(public schemaService: SchemaApiService) {}
}
