
export interface FieldGeneralInterface {
  type: 'ONE'|'SECOND'|'THIRD';
  typeEvent: 'NONE'|'MODAL'|'ROUTE'|'POPUP';
  icon?: string;
  text: string;
  resource?: string;
  fields?: FieldInterface[];
}

export interface FieldInterface {
  typeEvent: 'NONE'|'MODAL'|'ROUTE'|'POPUP';
  text: string;
  resource?: string;
  fields?: FieldInterface[];
}
