import {Component, OnInit} from '@angular/core';
import {ModalChildModel} from "@core-models/modal/modal-child.model";
import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";

@Component({
  selector: 'app-modal-edit-columns',
  templateUrl: './modal-edit-columns.component.html',
  styleUrls: ['./modal-edit-columns.component.css']
})
export class ModalEditColumnsComponent implements OnInit {

  public data: any;
  public dataGeneric: any;

  ngOnInit() {
  }

  public changeColumnVisible(data: TableColumnConfigInterface) {
    for (const config of this.data) {
      const columnNme = config.column_name;
      if (columnNme === data.column_name) config.visible = !data.visible;
      localStorage.setItem(this.dataGeneric, JSON.stringify(this.data));
    }
  }

  public moveUp(position: number): void {
    if ((position == 0)) return;
    [this.data[position], this.data[position - 1]] = [this.data[position - 1], this.data[position]];
    localStorage.setItem(this.dataGeneric, JSON.stringify(this.data));
  }

  public moveDown(position: number): void {
    if ((position == (this.data.length - 1))) return;
    [this.data[position], this.data[position + 1]] = [this.data[position + 1], this.data[position]];
    localStorage.setItem(this.dataGeneric, JSON.stringify(this.data));
  }

}
