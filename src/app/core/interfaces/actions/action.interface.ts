export interface ActionEvent {
  label: string;
  icon: string;
  typeIcon?: 'material' | 'fa';
  nameEvent: string;
  background?: string;
  color?: string;
  condition?: any;
  active?: boolean;
}
