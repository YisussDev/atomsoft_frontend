import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() source: string | File | null = null;
  @Input() width: string = '100%';
  @Input() height: string = '300px';
  @Input() showDownload: boolean = true;
  @Input() showOpenNew: boolean = true;

  safeUrl: SafeResourceUrl | null = null;
  objectUrl: string | null = null;
  fileType: 'pdf' | 'image' | 'video' | 'url' | 'unsupported' = 'unsupported';
  fileName: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  isFile: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.processSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source']) {
      // Limpiar URL anterior si existe
      if (this.objectUrl) {
        URL.revokeObjectURL(this.objectUrl);
        this.objectUrl = null;
      }
      this.processSource();
    }
  }

  ngOnDestroy(): void {
    // Limpiar object URL al destruir el componente
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }

  private processSource(): void {
    if (!this.source) {
      this.hasError = true;
      this.errorMessage = 'No se proporcionó ninguna fuente';
      this.isLoading = false;
      return;
    }

    try {
      this.isLoading = true;
      this.hasError = false;

      // Verificar si es un File object
      if (this.source instanceof File) {
        this.isFile = true;
        this.processFileObject(this.source);
      } else {
        this.isFile = false;
        this.processUrlString(this.source);
      }
    } catch (error) {
      this.hasError = true;
      this.errorMessage = 'Error al procesar el documento';
      this.isLoading = false;
      console.error('Error processing source:', error);
    }
  }

  private processFileObject(file: File): void {
    this.fileName = file.name;
    this.fileType = this.detectFileTypeFromFile(file);

    if (this.fileType === 'unsupported') {
      this.hasError = true;
      this.errorMessage = `Formato de archivo no soportado: ${file.type}`;
      this.isLoading = false;
      return;
    }

    // Crear Object URL para el archivo
    this.objectUrl = URL.createObjectURL(file);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
  }

  private processUrlString(url: string): void {
    this.fileType = this.detectFileTypeFromUrl(url);
    this.fileName = this.extractFileName(url);

    if (this.fileType === 'unsupported') {
      this.hasError = true;
      this.errorMessage = 'Formato de archivo no soportado';
      this.isLoading = false;
      return;
    }

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private detectFileTypeFromFile(file: File): 'pdf' | 'image' | 'video' | 'unsupported' {
    const type = file.type.toLowerCase();

    // PDF
    if (type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      return 'pdf';
    }

    // Images
    if (type.startsWith('image/')) {
      return 'image';
    }

    // Videos
    if (type.startsWith('video/')) {
      return 'video';
    }

    return 'unsupported';
  }

  private detectFileTypeFromUrl(url: string): 'pdf' | 'image' | 'video' | 'url' | 'unsupported' {
    const lowerUrl = url.toLowerCase();

    // PDF
    if (lowerUrl.includes('.pdf') || lowerUrl.includes('pdf')) {
      return 'pdf';
    }

    // Images
    if (lowerUrl.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?|$)/i)) {
      return 'image';
    }

    // Videos
    if (lowerUrl.match(/\.(mp4|webm|ogg|mov)(\?|$)/i)) {
      return 'video';
    }

    // Google Drive
    if (lowerUrl.includes('drive.google.com')) {
      return this.processGoogleDrive(url);
    }

    // URLs genéricas
    if (lowerUrl.startsWith('http://') || lowerUrl.startsWith('https://')) {
      return 'url';
    }

    return 'unsupported';
  }

  private processGoogleDrive(url: string): 'pdf' | 'url' {
    if (url.includes('/file/d/')) {
      const fileId = url.split('/file/d/')[1]?.split('/')[0];
      if (fileId && this.source && typeof this.source === 'string') {
        this.source = `https://drive.google.com/file/d/${fileId}/preview`;
        return 'pdf';
      }
    }
    return 'url';
  }

  private extractFileName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop() || 'documento';
      return decodeURIComponent(fileName);
    } catch {
      return 'documento';
    }
  }

  onLoad(): void {
    this.isLoading = false;
  }

  onError(): void {
    this.hasError = true;
    this.errorMessage = 'Error al cargar el documento';
    this.isLoading = false;
  }

  downloadFile(): void {
    if (!this.source) return;

    if (this.source instanceof File) {
      // Descargar File object
      const url = this.objectUrl || URL.createObjectURL(this.source);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Descargar desde URL
      const link = document.createElement('a');
      link.href = this.source;
      link.download = this.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  openInNewTab(): void {
    if (!this.source) return;

    if (this.source instanceof File) {
      const url = this.objectUrl || URL.createObjectURL(this.source);
      window.open(url, '_blank');
    } else {
      window.open(this.source, '_blank');
    }
  }

  getFileSizeFormatted(): string {
    if (this.source instanceof File) {
      const size = this.source.size;
      if (size < 1024) return size + ' B';
      if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
    return '';
  }
}
