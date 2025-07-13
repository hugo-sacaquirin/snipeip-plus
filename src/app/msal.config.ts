import { PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signupsignin',      // Usa tu nombre real de flujo
    passwordReset: 'B2C_1_passwordreset',    // Opcional: para reset de contraseña
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://test123888888888888azurea.b2clogin.com/test123azurea.onmicrosoft.com/B2C_1_signupsignin',
    },
    passwordReset: {
      authority: 'https://test1238888888888azurea.b2clogin.com/test123azurea.onmicrosoft.com/B2C_1_passwordreset',
    }
  },
  authorityDomain: 'test123azurea.b2clogin.com'
};

export const msalConfig = {
  auth: {
    clientId: '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: 'http://localhost:4200/',      // O tu URL de prod
    postLogoutRedirectUri: 'http://localhost:4200/'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  }
};

// Opcional: para proteger rutas e interceptar requests
export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: { scopes: ['openid', 'profile', 'offline_access'] }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map()
  };
}
