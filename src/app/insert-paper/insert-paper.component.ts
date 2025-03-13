import { Component } from '@angular/core';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-insert-paper',
  standalone: true, 
  imports: [ResearchBarComponent, RouterModule],
  templateUrl: './insert-paper.component.html',
  styleUrl: './insert-paper.component.css'
})
export class InsertPaperComponent {

}
