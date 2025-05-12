import { Component } from '@angular/core';
import { BarComponent } from '../bar/bar.component';

@Component({
  standalone: true, 
  selector: 'app-home',
  imports: [BarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
