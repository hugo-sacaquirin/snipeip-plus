import { Routes } from '@angular/router';
import { authGuard } from './modules/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./modules/home/home').then(m => m.HomeTs),
    canActivate: [authGuard],
    children: [
      {
        path: 'entidades',
        loadComponent: () => import('./modules/entidades/pages/lista/lista').then(m => m.ListaComponent)
      },
      {
        path: 'objetivos',
        loadComponent: () =>
          import('./modules/objetivos/pages/lista/lista').then(m => m.ListaObjetivosComponent)
      },
      {
        path: 'alineaciones',
        loadComponent: () => import('./modules/alineaciones/pages/list/lista')
          .then(m => m.ListaAlineacionesComponent)
      },
      {
        path: 'metas',
        loadComponent: () => import('./modules/metas/pages/lista/lista').then(m => m.ListaMetasComponent)
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./modules/proyectos/pages/lista/lista').then(m => m.ListaProyectosComponent)
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
