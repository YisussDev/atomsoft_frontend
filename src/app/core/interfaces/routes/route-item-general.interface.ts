export interface RouteItemGeneral {
  path: string;
  name: string;
  code: string;
  icon?: string;
  typeIcon?: 'fa' | 'material';
  children?: RouteItemGeneral[];
  availableNavigation?: boolean;
}
