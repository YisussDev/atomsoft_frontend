import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {GenerateGradient} from "@shared/utils/gradient-generator";

@Component({
  selector: 'app-card-application-carousel',
  templateUrl: './card-application-carousel.component.html',
  styleUrls: ['./card-application-carousel.component.css']
})
export class CardApplicationCarouselComponent implements OnInit, AfterViewInit {

  @ViewChild("gradientBlock", {static: false}) gradientBlock!: ElementRef;

  @Input() public application!: ApplicationEntity;

  constructor(
    private navigationUi: NavigationUi
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setGradientColor();
  }

  private setGradientColor(): void {
    this.gradientBlock.nativeElement.style.background = GenerateGradient(this.application.color_primary);
  }

  public goToApp(app_code: string): void {
    this.navigationUi.goToUrl(this.navigationUi.urlAdminPrefix + "store" + "/" + app_code);
  }

}
