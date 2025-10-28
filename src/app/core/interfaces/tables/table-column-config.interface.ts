export interface TableColumnConfig {
  visible: boolean;
  column_search: boolean;
  column_type: 'text' | 'number' | 'select' | 'date';
  column_name: string;
  column_translate: string;
}
