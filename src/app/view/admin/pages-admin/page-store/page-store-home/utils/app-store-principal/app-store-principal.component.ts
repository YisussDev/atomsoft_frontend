import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {GenerateGradient} from "@shared/utils/gradient-generator";

@Component({
  selector: 'app-app-store-principal',
  templateUrl: './app-store-principal.component.html',
  styleUrls: ['./app-store-principal.component.css']
})
export class AppStorePrincipalComponent implements AfterViewInit {

  @ViewChild("gradientBlock", {static: false}) gradientBlock!: ElementRef;

  @Input() public appPrincipal!: ApplicationEntity;

  ngAfterViewInit() {
    this.setGradientColor();
  }

  private setGradientColor(): void {
    this.gradientBlock.nativeElement.style.background = GenerateGradient(this.appPrincipal.color_primary);
  }

}
