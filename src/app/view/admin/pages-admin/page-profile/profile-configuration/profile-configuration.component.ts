import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {CacheStorage} from "@infrastructure/adapters/storage/cache/cache.storage";

@Component({
  selector: 'app-profile-configuration',
  templateUrl: './profile-configuration.component.html',
  styleUrls: ['./profile-configuration.component.css']
})
export class ProfileConfigurationComponent implements OnInit {

  public account!: AccountEntity & { jti: string };

  personalForm: FormGroup;
  twoFactorEnabled = false;

  user = {
    name: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+52 55 1234 5678',
    timezone: 'America/Mexico_City'
  };

  connectedDevices: any[] = [
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'desktop',
      browser: 'Chrome 120.0',
      location: 'Ciudad de México, México',
      lastActive: 'Ahora',
      current: true
    },
    {
      id: '2',
      name: 'iPhone 15',
      type: 'mobile',
      browser: 'Safari Mobile',
      location: 'Ciudad de México, México',
      lastActive: 'Hace 2 horas',
      current: false
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      browser: 'Safari',
      location: 'Guadalajara, México',
      lastActive: 'Hace 1 día',
      current: false
    },
    {
      id: '4',
      name: 'Windows PC',
      type: 'desktop',
      browser: 'Edge 120.0',
      location: 'Monterrey, México',
      lastActive: 'Hace 3 días',
      current: false
    }
  ];

  notifications: any = {
    email: true,
    push: true,
    sms: false,
    marketing: false
  };

  constructor(
    private fb: FormBuilder,
    private cacheStorage: CacheStorage
  ) {
    this.personalForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone],
      timezone: [this.user.timezone, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initAccount();
  }

  private initAccount(): void {
    this.account = this.cacheStorage.getByKey("_account_data");
  }

  savePersonalInfo(): void {
    if (this.personalForm.valid) {
      console.log('Saving personal info:', this.personalForm.value);
      // Aquí iría la lógica para guardar la información
    }
  }

  openChangePassword(): void {
    console.log('Opening change password modal');
    // Aquí iría la lógica para abrir el modal de cambio de contraseña
  }

  toggleTwoFactor(): void {
    this.twoFactorEnabled = !this.twoFactorEnabled;
    console.log('Two factor authentication:', this.twoFactorEnabled);
    // Aquí iría la lógica para activar/desactivar 2FA
  }

  disconnectDevice(deviceId: string): void {
    this.connectedDevices = this.connectedDevices.filter(device => device.id !== deviceId);
    console.log('Device disconnected:', deviceId);
    // Aquí iría la lógica para desconectar el dispositivo
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
