import { Component } from '@angular/core';
import { PaginatorComponent } from '@components/paginator/paginator.component';

@Component({
  selector: 'stamp-schemas',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './schemas.component.html',
  styleUrl: './schemas.component.css',
})
export class SchemasComponent {}
