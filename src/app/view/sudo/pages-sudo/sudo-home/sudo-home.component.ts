import {Component} from '@angular/core';


interface RevenueData {
  month: string;
  revenue: number;
}

interface UserData {
  day: string;
  users: number;
}

interface RecentUser {
  name: string;
  email: string;
  status: 'active' | 'pending';
  plan: string;
  joined: string;
}

@Component({
  selector: 'app-sudo-home',
  templateUrl: './sudo-home.component.html',
  styleUrls: ['./sudo-home.component.css']
})
export class SudoHomeComponent {

  revenueData: RevenueData[] = [
    {month: 'Ene', revenue: 45000},
    {month: 'Feb', revenue: 52000},
    {month: 'Mar', revenue: 48000},
    {month: 'Abr', revenue: 61000},
    {month: 'May', revenue: 55000},
    {month: 'Jun', revenue: 67000},
  ];

  activeUsersData: UserData[] = [
    {day: 'Lun', users: 2400},
    {day: 'Mar', users: 2800},
    {day: 'Mié', users: 3200},
    {day: 'Jue', users: 2900},
    {day: 'Vie', users: 3800},
    {day: 'Sáb', users: 3200},
    {day: 'Dom', users: 2600},
  ];

  recentUsers: RecentUser[] = [
    {name: 'María García', email: 'maria@example.com', status: 'active', plan: 'Enterprise', joined: 'Hace 2h'},
    {name: 'Carlos López', email: 'carlos@example.com', status: 'active', plan: 'Pro', joined: 'Hace 5h'},
    {name: 'Ana Martínez', email: 'ana@example.com', status: 'pending', plan: 'Starter', joined: 'Hace 1d'},
    {name: 'Juan Pérez', email: 'juan@example.com', status: 'active', plan: 'Pro', joined: 'Hace 2d'},
  ];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

}
