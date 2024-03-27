import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
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
  lastPage = computed(() =>
    Math.ceil((this.count() ?? 0) / (this.pageSize() ?? 10)),
  );
  pageSizes = SchemaQuery.pageSizes;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(e: Event): void {
    this.pageSizeChange.emit(Number((e.target as HTMLSelectElement).value));
  }

  onNextClick(): void {
    this.pageChange.emit(this.page() ?? 0 + 1);
  }

  onPreviousClick(): void {
    this.pageChange.emit(this.page() ?? 0 - 1);
  }

  onLastClick(): void {
    this.pageChange.emit(this.lastPage());
  }

  onFirstClick(): void {
    this.pageChange.emit(0);
  }
}
