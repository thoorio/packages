import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'state',
        loadComponent: () => import('./pages/state/state.page').then((m) => m.StatePage),
    },
];
