import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';
import { ResearchService , PaperDetail } from '../services/research.service';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-research',
  standalone: true, 
  imports: [CommonModule, ResearchBarComponent, RouterModule, FormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule], // เพิ่ม CommonModule ถ้าคุณใช้ ngIf หรือ ngFor
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
  providers: [ResearchService]
})
export class ResearchComponent {
        paperdetail: PaperDetail[] = [];
        searchText: string = ''; 
        searchField: keyof PaperDetail = 'title_thai';
        filteredPaperdetail: PaperDetail[] = []; 

        private researchService = inject(ResearchService);

        SelectResearchers() { 
            this.researchService.SelectPaperData().subscribe((data: PaperDetail[]) => {
              this.paperdetail = data;
              this.filteredPaperdetail = data; 
            });
          }

          SearchPaper() {
            this.filteredPaperdetail = this.paperdetail.filter((paperdetail) => {
              const fieldValue = String(paperdetail[this.searchField]);
              return fieldValue.toLowerCase().includes(this.searchText.toLowerCase());
            });
          }

          
          
}
