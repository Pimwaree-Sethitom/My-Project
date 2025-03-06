import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'research', loadComponent: () => import('./research/research.component').then(m => m.ResearchComponent) },
  { path: 'executive', loadComponent: () => import('./executive/executive.component').then(m => m.ExecutiveComponent) },
  { path: 'general', loadComponent: () => import('./general/general.component').then(m => m.GeneralComponent) },
];
