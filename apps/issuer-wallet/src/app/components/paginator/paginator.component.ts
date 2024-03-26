import { Component, input } from '@angular/core';
import { PageSize, pageSizes } from '@domain/page';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'stamp-paginator',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  pageSize = input.required<PageSize>();
  page = input.required<number>();
  totalPages = input.required<number>();
  pageSizes = pageSizes;
}
