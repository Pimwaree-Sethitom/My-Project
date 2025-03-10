import { Component } from '@angular/core';
import { AdminBarComponent } from '../admin-bar/admin-bar.component'; 

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AdminBarComponent], 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] 
})
export class AddUserComponent {}

