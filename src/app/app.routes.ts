import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)},
  { path: 'user', loadComponent: () => import('./user/user.component').then(m => m.UserComponent) },
  { path: 'research', loadComponent: () => import('./research/research.component').then(m => m.ResearchComponent) },
  { path: 'executive', loadComponent: () => import('./executive/executive.component').then(m => m.ExecutiveComponent) },
  { path: 'general', loadComponent: () => import('./general/general.component').then(m => m.GeneralComponent) },
  { path: 'home' , loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  { path: 'workload',loadComponent: () => import('./workload/workload.component').then(m => m.WorkloadComponent)},
  { path: 'research_type' ,loadComponent: () => import('./research-type/research-type.component').then(m => m.ResearchTypeComponent)},
  { path: 'Quartile' ,loadComponent: () => import('./quartile/quartile.component').then(m => m.QuartileComponent)},
  { path: 'admin_dashboard' ,loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m =>m.AdminDashboardComponent)},
  { path: 'executive_dashboard',loadComponent: () => import('./executive-dashboard/executive-dashboard.component').then(m => m.ExecutiveDashboardComponent)},
  { path: 'public-paper',loadComponent: () => import('./public-paper-list/public-paper-list.component').then(m => m.PublicPaperListComponent)},
  { path: 'public-paper/:id',loadComponent: () => import('./public-paper-detail/public-paper-detail.component').then(m => m.PublicPaperDetailComponent)}
];
