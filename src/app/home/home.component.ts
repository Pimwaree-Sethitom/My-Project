import { Component } from '@angular/core';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-home',
  imports: [BarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
