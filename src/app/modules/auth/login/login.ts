import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('LoginComponent init. isLoggedIn:', this.auth.isLoggedIn());
    // Aquí revisa de nuevo si ya hay sesión (útil después del redirect de Azure)
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']); // O '/home'
    }
  }

  login() {
    this.errorMsg = '';
  try {
      console.log('Intentando loginRedirect...');
      this.auth.login();
      // Si loginRedirect falla por error de MSAL (promesa rechazada, etc), esto lo captura:
    } catch (e: any) {
      console.error('Error al intentar loginRedirect:', e);
      this.errorMsg = 'No se pudo iniciar sesión. Asegúrate de permitir popups y cookies en tu navegador. ' +
                      'Si el problema persiste, prueba limpiar la caché o usar otro navegador.';
    }
  }
}
