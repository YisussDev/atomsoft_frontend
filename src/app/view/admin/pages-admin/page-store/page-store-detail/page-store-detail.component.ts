import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {FindOneApplicationUseCase} from "@application/ports/in/application/find-one-application.use-case";
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-page-store-detail',
  templateUrl: './page-store-detail.component.html',
  styleUrls: ['./page-store-detail.component.css']
})
export class PageStoreDetailComponent implements OnInit, AfterViewInit {

  @ViewChild("containerStars") starContainers!: ElementRef;

  public app = {
    id: 1,
    name: "Office Suite",
    developer: "Microsoft Corporation",
    icon: "📝",
    rating: 4.6,
    reviews: "125K",
    price: "Gratis",
    category: "Productividad",
    description: "Suite completa de productividad que incluye procesador de textos, hojas de cálculo y presentaciones. Perfecta para estudiantes y profesionales que buscan crear documentos de alta calidad.",
    features: [
      "Edición de documentos en tiempo real",
      "Colaboración en la nube",
      "Plantillas profesionales",
      "Compatible con todos los formatos",
      "Guardado automático"
    ],
    screenshots: ["📄", "📊", "📈", "💼", "🖼️"],
    size: "10 MB",
    version: "2025.1.0",
    updated: "Hoy"
  };

  public appPrincipal!: ApplicationEntity;

  private applicationId!: string;

  public isVisibleModalScreenshot: boolean = false;

  public chipViewing!: string;

  constructor(
    private findOneApplicationUseCase: FindOneApplicationUseCase,
    private _activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.extractParams();
    this.initApplication();
  }

  ngAfterViewInit() {
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
    this.starContainers.nativeElement.innerHTML = stars;
  }

  private extractParams(): void {
    const {applicationId} = this._activatedRoute.snapshot.params;
    this.applicationId = applicationId;
  }

  private initApplication(): void {
    this.findOneApplicationUseCase.execute({id: this.applicationId, includes: "plans"}).subscribe({
      next: (response) => {
        if (response.data) {
          this.appPrincipal = response.data;
          setTimeout(() => {
            this.renderStars();
          }, 500);
        }
      }
    });
  }

  public openModalViewChip(chip: string): void {
    this.chipViewing = chip;
    this.isVisibleModalScreenshot = true;
  }

  public goBack(): void {
    this.navigationService.navigateToAdminStore();
  }

  public goBuy(): void {
    this.navigationService.navigateTo(`admin/store/buy/${this.applicationId}`);
  }

  getStarPercentage(star: number): number {
    // Ejemplo de distribución, ajusta según tus datos reales
    const distribution: { [key: number]: number } = {
      5: 75,
      4: 15,
      3: 5,
      2: 3,
      1: 2
    };
    return distribution[star] || 0;
  }

}
