import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [IntroGuard, AuthGuard],
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }
];
