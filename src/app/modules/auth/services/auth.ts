import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private msal: MsalService) { }

  login() {
    console.log("Llamando loginRedirect...");
    this.msal.loginRedirect();
  }

  logout() {
    this.msal.logoutRedirect();
  }

  isLoggedIn(): boolean {
    const accounts = this.msal.instance.getAllAccounts();
    console.log('MSAL Accounts:', accounts);
    console.log('MSAL Instance:', this.msal.instance);
    // También prueba getActiveAccount()
    const active = this.msal.instance.getActiveAccount();
    console.log('Active Account:', active);
    return accounts.length > 0;
  }

  getUser() {
    return this.msal.instance.getActiveAccount();
  }

  getRoles(): string[] {
    const user = this.getUser();
    if (user && user.idTokenClaims && user.idTokenClaims['roles']) {
      return user.idTokenClaims['roles'];
    }
    return [];
  }
}
