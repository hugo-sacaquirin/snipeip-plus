import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // <--- Importa CommonModule, que ya trae todas las directivas estructurales

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeTs implements OnInit {
  nombre: string = '';
  puesto: string = '';
  constructor(public auth: AuthService) { }
  ngOnInit(): void {
    const claims = this.auth.getRoles() as { given_name: string, jobTitle: string };
    if (claims) {
      this.nombre = claims.given_name || '';
      this.puesto = claims.jobTitle || '';
    }
  }



  logout() {
    this.auth.logout();
  }
}