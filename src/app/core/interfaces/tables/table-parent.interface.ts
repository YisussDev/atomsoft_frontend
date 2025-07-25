export interface TableParentInterface<EntityToList> {

  initDataTable?(page: number, queries?: string[][]): void;

  initTableConfig(): void;

  initListenQueryParams?(): void;

  initTableFieldsActions?(data: { data: EntityToList, event: string }): void;

  listenEventFields(data: any): void;

  eventUpdate?(data: EntityToList): void;

  eventDetail?(data: EntityToList): void;

  eventDelete?(data: EntityToList): void;

  eventChangeLimit?(limit: number): void;

}
