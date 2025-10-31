import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {GenerateGradient} from "@shared/utils/gradient-generator";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-app-store-card',
  templateUrl: './app-store-card.component.html',
  styleUrls: ['./app-store-card.component.css']
})
export class AppStoreCardComponent implements AfterViewInit {

  @ViewChild("gradientBlock", {static: false}) gradientBlock!: ElementRef;
  @ViewChild("starContainer", {static: false}) starContainer!: ElementRef;

  @Input() public appPrincipal!: ApplicationEntity;

  constructor(
    private navigationService: NavigationService,
  ) {
  }

  ngAfterViewInit() {
    this.setGradientColor();
    this.renderStars();
  }

  private setGradientColor(): void {
    this.gradientBlock.nativeElement.style.background = this.appPrincipal.color_primary;
    // this.gradientBlock.nativeElement.style.background = GenerateGradient(this.appPrincipal.color_primary);
  }

  public renderStars(): void {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(5)) {
        stars += '<svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      } else if (i - 5 < 1) {
        stars += '<svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      } else {
        stars += '<svg class="w-4 h-4 fill-gray-300 text-gray-300" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      }
    }
    this.starContainer.nativeElement.innerHTML = stars;
  }

  public goToAppDetail(): void {
    this.navigationService.navigateTo(`/admin/store/detail/${this.appPrincipal.id}`);
  }

}
