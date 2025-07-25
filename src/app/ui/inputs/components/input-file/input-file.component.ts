import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import Swal from "sweetalert2";
import {AbstractControl} from "@angular/forms";
import {InputSchema} from "../../models/input-schema";
import {ErrorInputService} from "../../services/error-input.service";
import {FilesService} from "@core/services/files/files.service";

@Component({
  selector: 'combo-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent extends InputSchema implements OnInit, OnChanges, OnDestroy {

  @Input() override control!: AbstractControl
  @Input() public override inputValue: string | number | null = null;
  @Input() public override inputTheme: 'NORMAL' | 'LIGHT' | 'MATERIAL' = 'NORMAL';
  @Input() public override inputLabel: string = 'default_label';
  @Input() public override inputName: string = 'default_name';
  @Input() public override inputPlaceholder: string = 'default_placeholder';
  @Input() public override inputColorBorderEmpty: string = '#3a3a3a';
  @Input() public override inputColorBackgroundEmpty: string = 'rgba(255,255,255,0)';
  @Input() public override inputColorBackgroundSuccess: string = 'rgba(108,255,116,0.5)';
  @Input() public override inputColorTextSuccess: string = '#FFF';
  @Input() public override inputColorBorderSuccess: string = '#1aff00';
  @Input() public override inputColorBackgroundError: string = 'rgba(255,89,89,0.5)';
  @Input() public override inputColorTextError: string = '#FFF';
  @Input() public override inputColorBorderError: string = '#ff1111';
  @Input() public override inputIconActive?: boolean = false;
  @Input() public override inputTypeIcon?: 'material' | 'fa';
  @Input() public override inputIcon?: string;
  @Input() public override disabled: boolean = false;
  @Input() public override touched: boolean = false;
  @Input() public sizeMax: number = 5;
  @Input() public file!: string;
  @Input() public accept: string = '.pdf, .jpg, .png';
  @Input() public square: boolean = false;

  @Output() $customLogicInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() $changeInput: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private errorInputService: ErrorInputService,
    private filesService: FilesService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }


  ngOnInit(): void {
    this.listenChangesControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes['control']) {
      }
    }
  }

  public async loadFiles(event: any): Promise<void> {
    this.$changeInput.emit(event.target.files);
    try {
      let files: File[] = event.target.files;
      for (let file of files) {
        await this.filesService.convertToBase64(file, this.sizeMax)
          .then(fileConverted => {
            if (this.control) {
              this.control.setValue(fileConverted);
            }
            this.$customLogicInput.emit(fileConverted);
            Swal.fire({
              icon: 'success',
              title: 'Cargue Exitoso',
              text: `Archivo cargado exitosamente.`,
              confirmButtonText: 'Ok'
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: '¡Ops!',
              text: error.message,
              confirmButtonText: 'Continuar'
            });
          });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: '¡Ops!',
        text: `Archivo ${err.file} no se pudo cargar.`,
        confirmButtonText: 'Ok'
      })
    }
  }

  public loadDocument(event: any): void {
    if (this.validateSize(event.target.files[0].size)) {
      const archive = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.control) {
          this.control.setValue({
            file: e.target.result.split(',')[1],
            ext: event.target.files[0].type.slice(-3),
            name: event.target.files[0].name
          });
        }
      }
      reader.readAsDataURL(archive);
    } else {
      this.resetDocument(event);
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Archivo excede peso máximo',
        confirmButtonText: 'Ok'
      })
    }
  }

  public resetDocument(event: any): void {
    event.target.value = '';
    if (this.control) {
      this.control.setValue(null);
    }
  }

  public override changeValue(value: any): void {
    if (!this.control) return;
    if (value) {
      this.control.setValue(value);
    } else {
      this.control.setValue(null);
    }
  }

  private validateSize(size: number): boolean {
    return size < (this.sizeMax * 1024)
  }

  public override getErrorMessage(): string {
    if (!this.control) return '';
    return this.errorInputService.extractErrorFromDictionary(this.control.errors);
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
