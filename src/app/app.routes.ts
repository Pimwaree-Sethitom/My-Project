import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'research', loadComponent: () => import('./research/research.component').then(m => m.ResearchComponent) },
  { path: 'executive', loadComponent: () => import('./executive/executive.component').then(m => m.ExecutiveComponent) },
  { path: 'general', loadComponent: () => import('./general/general.component').then(m => m.GeneralComponent) },
  { path: 'link_dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  {path: 'link_home' , loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path: 'workload',loadComponent: () => import('./workload/workload.component').then(m => m.WorkloadComponent)},
  {path: 'research_type' ,loadComponent: () => import('./research-type/research-type.component').then(m => m.ResearchTypeComponent)},
  {path: 'Quartile' ,loadComponent: () => import('./quartile/quartile.component').then(m => m.QuartileComponent)},
  {path: 'register' ,loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)},
];
