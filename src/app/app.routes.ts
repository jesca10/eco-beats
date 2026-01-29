import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'intro',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: 'menu', canActivate: [AuthGuard, IntroGuard],
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.page').then(m => m.SearchPage)
      },
      {
        path: '',
        redirectTo: '/menu/home',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'tracks-modal',
    loadComponent: () => import('./pages/tracks-modal/tracks-modal.page').then(m => m.TracksModalPage)
  },
  {
    path: 'now-playing',
    loadComponent: () => import('./pages/now-playing/now-playing.page').then(m => m.NowPlayingPage)
  },
  {
    path: 'player-modal',
    loadComponent: () => import('./pages/player-modal/player-modal.page').then(m => m.PlayerModalPage)
  }
];
