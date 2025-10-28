import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-store-detail',
  templateUrl: './page-store-detail.component.html',
  styleUrls: ['./page-store-detail.component.css']
})
export class PageStoreDetailComponent implements OnInit {

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
    size: "450 MB",
    version: "2024.1.0",
    updated: "Hace 1 semana"
  };

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
