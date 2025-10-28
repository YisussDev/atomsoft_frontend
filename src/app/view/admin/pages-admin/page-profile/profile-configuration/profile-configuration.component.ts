import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {TabInterface} from "@ui/tab/interfaces/tab.interface";

@Component({
  selector: 'app-profile-configuration',
  templateUrl: './profile-configuration.component.html',
  styleUrls: ['./profile-configuration.component.css']
})
export class ProfileConfigurationComponent implements OnInit, AfterViewInit {

  public account!: AccountEntity & { jti: string };

  public personalForm: FormGroup;

  public notifications: any = {
    email: true,
    push: true,
    sms: false,
    marketing: false
  };

  @ViewChild('configurationData') configurationData!: TemplateRef<any>;
  @ViewChild('configurationSecurity') configurationSecurity!: TemplateRef<any>;
  @ViewChild('configurationSessions') configurationSessions!: TemplateRef<any>;

  public componentTabs: TabInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private cacheStorage: CacheStorage,
    private _cdr: ChangeDetectorRef,
  ) {
    this.personalForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initAccount();
  }

  ngAfterViewInit() {
    this.componentTabs = [
      {
        label: "Personal",
        content: this.configurationData
      },
      {
        label: "Seguridad",
        content: this.configurationSecurity
      },
      {
        label: "Dispositivos",
        content: this.configurationSessions
      }
    ];
    this._cdr.detectChanges();
  }

  private initAccount(): void {
    this.account = this.cacheStorage.getByKey("_account_data");
  }

  toggleNotification(type: keyof any): void {
    this.notifications[type] = !this.notifications[type];
    console.log('Notification settings updated:', this.notifications);
    // Aquí iría la lógica para actualizar las preferencias de notificaciones
  }

  openDeleteAccount(): void {
    const confirmed = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmed) {
      console.log('Account deletion confirmed');
      // Aquí iría la lógica para eliminar la cuenta
    }
  }
}
