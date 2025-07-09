import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './app/msal.config';
import { App } from './app/app'; // <-- Cambia HomeTs por App

async function main() {
  // Inicializa MSAL antes de arrancar Angular
  const msalInstance = new PublicClientApplication(msalConfig);
  await msalInstance.initialize();
  (window as any).msalInstance = msalInstance; // <-- Guárdala globalmente para los providers

  await bootstrapApplication(App, appConfig) // <-- Cambia aquí
    .catch((err) => console.error(err));
}

main();
