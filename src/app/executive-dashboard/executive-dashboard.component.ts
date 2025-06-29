import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarForExecutiveProfileComponent } from '../navbar-for-executive-profile/navbar-for-executive-profile.component';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true, 
  imports: [DashboardComponent,NavbarForExecutiveProfileComponent],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent {

}
