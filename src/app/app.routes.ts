import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'entidades',
    loadComponent: () =>
      import('./modules/entidades/pages/lista/lista').then(m => m.ListaComponent)
  },
  {
    path: '',
    redirectTo: 'entidades',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'entidades'
  }
];
