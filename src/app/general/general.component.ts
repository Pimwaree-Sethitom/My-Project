import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarForGeneralProfileComponent } from '../navbar-for-general-profile/navbar-for-general-profile.component';


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [ProfileComponent,NavbarForGeneralProfileComponent],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']  
})
export class GeneralComponent  { 
}
