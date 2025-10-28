import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {TabInterface} from "@ui/tab/interfaces/tab.interface";

@Component({
  selector: 'app-page-store-home',
  templateUrl: './page-store-home.component.html',
  styleUrls: ['./page-store-home.component.css']
})
export class PageStoreHomeComponent implements OnInit, AfterViewInit {

  public apps = [
    {
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
    },
    {
      id: 2,
      name: "Video Editor Pro",
      developer: "Creative Labs",
      icon: "🎬",
      rating: 4.5,
      reviews: "89K",
      price: "$29.99",
      category: "Multimedia",
      description: "Editor de video profesional con efectos avanzados, transiciones suaves y herramientas de color grading. Crea contenido impresionante para redes sociales y proyectos profesionales.",
      features: [
        "Edición multipista",
        "Efectos visuales en 4K",
        "Biblioteca de música libre",
        "Exportación rápida",
        "Chroma key profesional"
      ],
      screenshots: ["🎥", "✂️", "🎞️", "🌈", "⭐"],
      size: "680 MB",
      version: "5.2.1",
      updated: "Hace 3 días"
    },
    {
      id: 3,
      name: "Code Studio",
      developer: "DevTools Inc",
      icon: "💻",
      rating: 4.8,
      reviews: "210K",
      price: "Gratis",
      category: "Desarrollo",
      description: "IDE moderno y potente para desarrolladores. Soporta múltiples lenguajes de programación con autocompletado inteligente, depuración integrada y extensiones personalizables.",
      features: [
        "Soporte multi-lenguaje",
        "IntelliSense avanzado",
        "Git integrado",
        "Terminal integrada",
        "Temas personalizables"
      ],
      screenshots: ["⌨️", "🔧", "🐛", "📦", "🚀"],
      size: "320 MB",
      version: "1.85.0",
      updated: "Hace 2 días"
    },
    {
      id: 4,
      name: "Photo Manager",
      developer: "ImageSoft",
      icon: "📷",
      rating: 4.4,
      reviews: "67K",
      price: "Gratis",
      category: "Fotografía",
      description: "Organiza y edita tus fotos con facilidad. Incluye herramientas de retoque, filtros artísticos y organización inteligente basada en IA para encontrar tus mejores momentos.",
      features: [
        "Reconocimiento facial IA",
        "Edición no destructiva",
        "Sincronización en nube",
        "Álbumes inteligentes",
        "Búsqueda avanzada"
      ],
      screenshots: ["🖼️", "🎨", "✨", "🌅", "📸"],
      size: "280 MB",
      version: "3.4.2",
      updated: "Hace 1 semana"
    },
    {
      id: 5,
      name: "Music Studio",
      developer: "Audio Pro",
      icon: "🎵",
      rating: 4.7,
      reviews: "156K",
      price: "$49.99",
      category: "Música",
      description: "Estación de trabajo de audio digital completa para producción musical. Graba, edita y mezcla tus pistas con calidad de estudio profesional.",
      features: [
        "Grabación multipista ilimitada",
        "VST y plugins integrados",
        "Mezclador profesional",
        "Biblioteca de loops",
        "Exportación en alta resolución"
      ],
      screenshots: ["🎹", "🎧", "🎤", "🎼", "🔊"],
      size: "820 MB",
      version: "6.1.0",
      updated: "Hace 5 días"
    },
    {
      id: 6,
      name: "Cloud Storage",
      developer: "CloudTech",
      icon: "☁️",
      rating: 4.3,
      reviews: "98K",
      price: "Gratis",
      category: "Utilidades",
      description: "Almacenamiento seguro en la nube con sincronización automática. Accede a tus archivos desde cualquier dispositivo con encriptación de extremo a extremo.",
      features: [
        "15 GB gratis",
        "Sincronización automática",
        "Compartir archivos fácilmente",
        "Copias de seguridad",
        "Acceso offline"
      ],
      screenshots: ["📁", "🔐", "🔄", "📤", "💾"],
      size: "95 MB",
      version: "2.8.3",
      updated: "Hace 4 días"
    },
    {
      id: 7,
      name: "Gaming Hub",
      developer: "GameCenter",
      icon: "🎮",
      rating: 4.6,
      reviews: "342K",
      price: "Gratis",
      category: "Juegos",
      description: "Tu centro de juegos todo-en-uno. Accede a tu biblioteca de juegos, conecta con amigos y descubre nuevos títulos con recomendaciones personalizadas.",
      features: [
        "Biblioteca unificada",
        "Chat con amigos",
        "Logros y estadísticas",
        "Streaming de juegos",
        "Recomendaciones IA"
      ],
      screenshots: ["🕹️", "🏆", "👾", "🎯", "⚡"],
      size: "215 MB",
      version: "4.5.0",
      updated: "Hace 1 día"
    },
    {
      id: 8,
      name: "Fitness Tracker",
      developer: "HealthTech",
      icon: "💪",
      rating: 4.5,
      reviews: "178K",
      price: "Gratis",
      category: "Salud",
      description: "Monitorea tu actividad física, nutrición y sueño. Establece metas personalizadas y recibe planes de entrenamiento adaptados a tu nivel y objetivos.",
      features: [
        "Seguimiento de actividad 24/7",
        "Planes de entrenamiento",
        "Contador de calorías",
        "Análisis de sueño",
        "Integración con wearables"
      ],
      screenshots: ["🏃", "📊", "🥗", "😴", "🎯"],
      size: "145 MB",
      version: "5.0.2",
      updated: "Hace 2 semanas"
    }
  ];

  public appPrincipal!: ApplicationEntity;

  public appsPraxi: ApplicationEntity[] = [];


  constructor(
    private _cacheStorage: CacheStorage,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initApps();
  }

  private initApps(): void {
    this.appsPraxi = this._cacheStorage.getByKey("_app_list_data");
    this.appPrincipal = this.appsPraxi[1];
  }

  renderApps(): void {
    const grid = document.getElementById('appsGrid');
    if (!grid) return;
    grid.innerHTML = this.apps.map(app => `
                <div class="app-card bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer" onclick="showDetail(${app.id})">
                    <div class="p-6">
                        <div class="text-5xl bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
                            ${app.icon}
                        </div>
                        <h3 class="font-semibold text-gray-900 text-lg mb-1 truncate">${app.name}</h3>
                        <p class="text-sm text-gray-600 mb-3">${app.developer}</p>
                        <div class="flex items-center gap-2 mb-3">
                            <div class="flex items-center gap-1">
                                ${this.renderStars(app.rating)}
                            </div>
                            <span class="text-sm font-medium text-gray-700">${app.rating}</span>
                            <span class="text-sm text-gray-500">(${app.reviews})</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-blue-600">${app.price}</span>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">${app.category}</span>
                        </div>
                    </div>
                    <div class="px-6 pb-6">
                        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                            Obtener
                        </button>
                    </div>
                </div>
            `).join('');
  }

  renderStars(rating: any) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += '<svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      } else if (i - rating < 1) {
        stars += '<svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      } else {
        stars += '<svg class="w-4 h-4 fill-gray-300 text-gray-300" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
      }
    }
    return stars;
  }

  showDetail(appId: any) {
    const app = this.apps.find(a => a.id === appId);
    if (!app) return;

    // @ts-ignore
    document.getElementById('storeView').classList.add('hidden');
    // @ts-ignore
    document.getElementById('detailView').classList.remove('hidden');

    const detailContent = document.getElementById('detailContent');
    if (!detailContent) return;
    detailContent.innerHTML = `
                <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <div class="flex gap-8 mb-8">
                        <div class="text-7xl bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl w-32 h-32 flex items-center justify-center shadow-lg flex-shrink-0">
                            ${app.icon}
                        </div>
                        <div class="flex-1">
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">${app.name}</h1>
                            <p class="text-lg text-gray-600 mb-4">${app.developer}</p>
                            <div class="flex items-center gap-6 mb-6">
                                <div class="flex items-center gap-2">
                                    <div class="flex">${this.renderStars(app.rating)}</div>
                                    <span class="text-lg font-semibold text-gray-900">${app.rating}</span>
                                    <span class="text-gray-500">(${app.reviews} calificaciones)</span>
                                </div>
                                <span class="text-gray-400">|</span>
                                <span class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">${app.category}</span>
                            </div>
                            <div class="flex gap-4">
                                <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors">
                                    Obtener
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors">
                                    Agregar a la lista de deseos
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-8 py-6 border-t border-gray-200">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Precio</p>
                            <p class="text-lg font-semibold text-gray-900">${app.price}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Tamaño</p>
                            <p class="text-lg font-semibold text-gray-900">${app.size}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Versión</p>
                            <p class="text-lg font-semibold text-gray-900">${app.version}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Actualizado</p>
                            <p class="text-lg font-semibold text-gray-900">${app.updated}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Capturas de pantalla</h2>
                    <div class="grid grid-cols-5 gap-4">
                        ${app.screenshots.map(screenshot => `
                            <div class="screenshot-card aspect-video bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-6xl shadow-md cursor-pointer">
                                ${screenshot}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-2 bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Descripción</h2>
                        <p class="text-gray-700 leading-relaxed mb-6">${app.description}</p>

                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Características</h3>
                        <ul class="space-y-2">
                            ${app.features.map(feature => `
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-gray-700">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Calificaciones</h2>
                        <div class="text-center mb-6">
                            <p class="text-5xl font-bold text-gray-900 mb-2">${app.rating}</p>
                            <div class="flex justify-center mb-2">${this.renderStars(app.rating)}</div>
                            <p class="text-sm text-gray-600">${app.reviews} calificaciones</p>
                        </div>

                        <div class="space-y-2">
                            ${[5, 4, 3, 2, 1].map(star => `
                                <div class="flex items-center gap-2">
                                    <span class="text-sm w-3 text-gray-600">${star}</span>
                                    <svg class="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${star === 5 ? 75 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 3 : 2}%"></div>
                                    </div>
                                    <span class="text-xs text-gray-500 w-8 text-right">${star === 5 ? 75 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 3 : 2}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

    window.scrollTo(0, 0);
  }

  @ViewChild('homeAllApps') homeAllApps!: TemplateRef<any>;
  @ViewChild('homeCommerceApps') homeCommerceApps!: TemplateRef<any>;
  @ViewChild('homeFinancialApps') homeFinancialApps!: TemplateRef<any>;

  public componentTabs: TabInterface[] = [];

  settings = ['Notificaciones', 'Privacidad', 'Seguridad', 'Tema'];

  ngAfterViewInit() {
    this.componentTabs = [
      {
        label: 'Todas las apps',
        content: this.homeAllApps
      },
      {
        label: 'Comercio',
        content: this.homeCommerceApps
      },
      {
        label: 'Finanzas',
        content: this.homeFinancialApps
      }
    ];
    this._cdr.detectChanges();
  }

}
