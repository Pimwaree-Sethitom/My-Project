import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarForExecutiveProfileComponent } from '../navbar-for-executive-profile/navbar-for-executive-profile.component';

@Component({
  selector: 'app-executive',
  standalone: true, 
  imports: [ProfileComponent,NavbarForExecutiveProfileComponent], 
  templateUrl: './executive.component.html',
  styleUrl: './executive.component.css'
})
export class ExecutiveComponent {

}
