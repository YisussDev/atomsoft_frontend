import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FieldGeneralInterface, FieldInterface} from "../../interfaces/config-sidebar-fields.interface";

@Component({
  selector: 'app-field-sidebar',
  templateUrl: './field-sidebar.component.html',
  styleUrls: ['./field-sidebar.component.css']
})
export class FieldSidebarComponent {

  @Input() typeGeneral: string = 'oneLevel'

  @Input() collapsedSidebar: boolean = false;

  @Input() configurationField!: FieldGeneralInterface;

  @Input() iconName!: string;

  public expanded: boolean = false;

  public expandedThirdLevel: boolean = false;
  public expandedNameLevel: string = '';

  constructor(
    private router: Router
  ) {

  }

  expandCollapse(): void {
    this.expanded = !this.expanded
  }
  expandCollapseThirdLevel(nameExpanded: string): void {
    if(nameExpanded == this.expandedNameLevel){
      this.expandedNameLevel = '';
      this.expandedThirdLevel = !this.expandedThirdLevel;
    }
    else{
      this.expandedNameLevel = nameExpanded;
      this.expandedThirdLevel = true;
    }
  }
  eventField(fieldInfo: FieldGeneralInterface | FieldInterface):void{
    if(fieldInfo.typeEvent == 'ROUTE'){
      this.router.navigateByUrl(fieldInfo.resource||'');
    }
    else{
    }
  }

}
