import {TableColumnConfig} from "@core/interfaces/tables/table-column-config.interface";

export class TableParentModel<Entity> {

  public tableData: Entity[] = [];
  public tableColumnConfig: TableColumnConfig[] = [];

}
