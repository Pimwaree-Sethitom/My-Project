import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']  
})
export class GeneralComponent  { 
}
