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

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

}
