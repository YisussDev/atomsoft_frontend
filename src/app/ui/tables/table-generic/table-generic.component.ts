import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {ColumnTemplateDirective} from "@core/directives/column-template/column-template.directive";

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}

export interface PaginationConfig {
  currentPage: number;
  totalItems: number;
  limit: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | '';
}

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
})
export class TableGenericComponent implements AfterContentInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() tableTitle = 'Tabla de Datos';
  @Input() showSearch = true;
  @Input() showExport = true;
  @Input() showPagination = true;
  @Input() itemsPerPage = 10;

  // Paginación externa (backend)
  @Input() currentPage?: number;
  @Input() totalItems?: number;
  @Input() limit?: number;

  @ContentChildren(ColumnTemplateDirective) columnTemplates!: QueryList<ColumnTemplateDirective>;

  // Eventos
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();

  private templateMap = new Map<string, TemplateRef<any>>();

  searchTerm = '';
  internalCurrentPage = 1;
  sortConfig: SortConfig = {key: '', direction: ''};

  ngAfterContentInit() {
    // Mapear templates por columnKey
    this.columnTemplates.forEach(item => {
      this.templateMap.set(item.columnKey, item.template);
    });
  }

  getTemplateForColumn(columnKey: string): TemplateRef<any> | null {
    return this.templateMap.get(columnKey) || null;
  }

  get usePaginationConfig(): boolean {
    return this.currentPage !== undefined && this.totalItems !== undefined && this.limit !== undefined;
  }

  get currentPageNumber(): number {
    return this.usePaginationConfig ? this.currentPage! : this.internalCurrentPage;
  }

  get calculatedTotalPages(): number {
    if (this.usePaginationConfig) {
      return Math.ceil(this.totalItems! / this.limit!);
    }
    return Math.ceil(this.sortedData.length / this.itemsPerPage);
  }

  getStartIndex(): number {
    if (!this.usePaginationConfig) return 0;
    return (this.currentPage! - 1) * this.limit!;
  }

  getEndIndex(): number {
    if (!this.usePaginationConfig) return 0;
    const end = this.currentPage! * this.limit!;
    return Math.min(end, this.totalItems!);
  }

  get displayData(): any[] {
    // 🔹 SIEMPRE usar sortedData para que el ordenamiento funcione
    if (this.usePaginationConfig) {
      return this.sortedData; // Ordenar los datos del backend
    }
    return this.paginatedData; // Ya incluye sorting + paginación
  }

  get filteredData(): any[] {
    if (!this.searchTerm) return this.data;
    return this.data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get sortedData(): any[] {
    const data = [...this.filteredData];

    // 🔹 Ordenar SIEMPRE, sin importar el tipo de paginación
    if (!this.sortConfig.key || !this.sortConfig.direction) return data;

    return data.sort((a, b) => {
      const aVal = a[this.sortConfig.key];
      const bVal = b[this.sortConfig.key];
      const dir = this.sortConfig.direction === 'asc' ? 1 : -1;

      if (aVal < bVal) return -dir;
      if (aVal > bVal) return dir;
      return 0;
    });
  }

  get paginatedData(): any[] {
    const start = (this.internalCurrentPage - 1) * this.itemsPerPage;
    return this.sortedData.slice(start, start + this.itemsPerPage);
  }

  handleSort(key: string) {
    // Alternar dirección de ordenamiento
    if (this.sortConfig.key === key) {
      // Ciclo: asc -> desc -> sin orden
      if (this.sortConfig.direction === 'asc') {
        this.sortConfig.direction = 'desc';
      } else if (this.sortConfig.direction === 'desc') {
        this.sortConfig = {key: '', direction: ''};
      } else {
        this.sortConfig.direction = 'asc';
      }
    } else {
      this.sortConfig = {key, direction: 'asc'};
    }

    // 🔹 El ordenamiento se aplica automáticamente en el getter sortedData
    // No se necesita emitir evento al backend si solo quieres ordenar la data actual
  }

  onSearchChange() {
    if (this.usePaginationConfig) {
      this.searchChange.emit(this.searchTerm);
      // Reiniciar a página 1 cuando se busca
      this.pageChange.emit(1);
    } else {
      this.internalCurrentPage = 1;
    }
  }

  onGoToPage(page: number) {
    if (this.usePaginationConfig) {
      this.pageChange.emit(page);
    } else {
      this.internalCurrentPage = page;
    }
  }

  onPreviousPage() {
    if (this.currentPageNumber > 1) {
      this.onGoToPage(this.currentPageNumber - 1);
    }
  }

  onNextPage() {
    if (this.currentPageNumber < this.calculatedTotalPages) {
      this.onGoToPage(this.currentPageNumber + 1);
    }
  }

  getVisiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const totalPages = this.calculatedTotalPages;
    const currentPage = this.currentPageNumber;

    if (totalPages <= maxVisible + 2) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  }

  exportToCSV() {
    const dataToExport = this.usePaginationConfig ? this.data : this.sortedData;
    const csv = [
      this.columns.map(c => c.header).join(','),
      ...dataToExport.map(row =>
        this.columns.map(c => {
          const val = row[c.key];
          return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.tableTitle.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  exportToJSON() {
    const dataToExport = this.usePaginationConfig ? this.data : this.sortedData;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.tableTitle.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
