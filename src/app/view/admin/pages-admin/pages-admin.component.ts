import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.css']
})
export class PagesAdminComponent implements OnInit {

  searchTerm: string = '';
  isUserMenuOpen: boolean = false;

  user = {
    name: 'Juan Pérez',
    role: 'Administrador',
    avatar: '/assets/images/placeholder-user.jpg',
    initials: 'JP'
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  logout(): void {
    // Implementar logout
    console.log('Cerrando sesión...');
  }

  goToSettings(): void {
    // Implementar navegación a configuración
    console.log('Ir a configuración');
  }

  goToProfile(): void {
    // Implementar navegación a perfil
    console.log('Ir a perfil');
  }

}
