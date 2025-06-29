import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true, 
  imports: [DashboardComponent,AdminBarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
