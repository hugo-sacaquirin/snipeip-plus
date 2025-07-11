import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'] 
})
export class HomeTs {
  constructor(public auth: AuthService) {}

  get nombreUsuario() {
    const user = this.auth.getUser();
    return user?.name || user?.username || 'Usuario';
  }

  get roles() {
    return this.auth.getRoles();
  }

  logout() {
    this.auth.logout();
  }
}