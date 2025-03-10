import { Component } from '@angular/core';
import { AdminBarComponent } from '../admin-bar/admin-bar.component'; 

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [AdminBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
