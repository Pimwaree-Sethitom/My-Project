import { Component } from '@angular/core';
import { NavbarHomeComponent } from '../navbar-home/navbar-home.component';

@Component({
  standalone: true, 
  selector: 'app-home',
  imports: [NavbarHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
