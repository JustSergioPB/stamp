import { Component, input } from '@angular/core';
import { SchemaQuery } from '@domain/schema';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'stamp-paginator',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  pageSize = input<number>();
  page = input<number>();
  count = input<number>();
  pageSizes = SchemaQuery.pageSizes;
}
