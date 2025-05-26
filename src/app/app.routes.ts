import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)},
  { path: 'user', loadComponent: () => import('./user/user.component').then(m => m.UserComponent) },
  { path: 'research', loadComponent: () => import('./research/research.component').then(m => m.ResearchComponent) },
  { path: 'executive', loadComponent: () => import('./executive/executive.component').then(m => m.ExecutiveComponent) },
  { path: 'general', loadComponent: () => import('./general/general.component').then(m => m.GeneralComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'home' , loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  { path: 'workload',loadComponent: () => import('./workload/workload.component').then(m => m.WorkloadComponent)},
  { path: 'research_type' ,loadComponent: () => import('./research-type/research-type.component').then(m => m.ResearchTypeComponent)},
  { path: 'Quartile' ,loadComponent: () => import('./quartile/quartile.component').then(m => m.QuartileComponent)},
  { path: 'register' ,loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)},
  
  
];
