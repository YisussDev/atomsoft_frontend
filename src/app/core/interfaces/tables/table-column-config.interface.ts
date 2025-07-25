export interface TableColumnConfigInterface {
  visible: boolean;
  column_search: boolean;
  column_type: 'text' | 'number' | 'select' | 'date' | 'range';
  column_name: string;
  column_translate: string;
  column_pipe: 'normal' | 'cash' | 'custom' | 'date' | 'badge';
  column_fn?: string | Function | any;
  column_config?: ConfigColumnCustom[];
  column_order?: "none" | "asc" | "desc";
}

export interface ConfigColumnCustom {
  custom_key: string;
  custom_icon: string;
  custom_visible: boolean;
  custom_label: string;
  custom_color: string;
}
