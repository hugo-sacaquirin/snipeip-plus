import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private msal: MsalService, private router: Router) { }

  login() {
    this.msal.loginPopup().subscribe({
      next: (result) => {
        const user = this.msal.instance.getAllAccounts()[0];
        if (this.isLoggedIn()) {
          this.router.navigate(['/']); // O '/home'
        }
        console.log(user); // debería mostrar el objeto user
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logout() {
    this.msal.logoutRedirect();
  }

  isLoggedIn(): boolean {
    const accounts = this.msal.instance.getAllAccounts();
    console.log('MSAL Accounts:', accounts);
    return accounts.length > 0;
  }


  getRoles() {
    const user = this.msal.instance.getAllAccounts()[0];
    return user.idTokenClaims;
  }
}
