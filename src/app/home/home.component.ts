import { Component } from '@angular/core';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';

@Component({
  selector: 'app-home',
  imports: [AdminBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
