import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';

@Component({
  selector: 'app-admin',
  standalone: true, 
  imports: [ProfileComponent, AdminBarComponent ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent  {
       

  
}
