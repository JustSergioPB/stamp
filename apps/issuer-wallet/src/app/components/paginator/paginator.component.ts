import { Component, input } from '@angular/core';
import {
  ItemsPerPageOptions,
  itemsPerPageOptions,
} from '@models/paginator/items-per-page-options';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'stamp-paginator',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  itemsPerPage = input.required<ItemsPerPageOptions>();
  page = input.required<number>();
  totalPages = input.required<number>();
  itemsPerPageOptions = itemsPerPageOptions;
}
