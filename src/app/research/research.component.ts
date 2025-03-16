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
export class ResearchComponent implements OnInit{
        paperdetail: PaperDetail[] = [];
        searchText: string = ''; 
        searchField: keyof PaperDetail = 'title_thai';
        filteredPaperdetail: PaperDetail[] = []; 

        private researchService = inject(ResearchService);

        ngOnInit(): void { 
          this.SelectPaper();
        }

        SelectPaper() { 
            this.researchService.SelectPaperData().subscribe((data: PaperDetail[]) => {
              this.paperdetail = data;
              this.filteredPaperdetail = data; 
            });
          }

          SearchPaper() {
            const searchTextNormalized = this.searchText
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
          
            this.filteredPaperdetail = this.paperdetail.filter((paperdetail) => {
              const fieldValue = String(paperdetail[this.searchField])
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
          
              // แยกคำโดยใช้เว้นวรรคและสัญลักษณ์ที่ใช้แบ่งคำ
              const words = fieldValue.split(/[\s\-\/]+/);
          
              // ตรวจสอบว่ามีคำที่ขึ้นต้นด้วย searchText หรือไม่
              return words.some(word => word.startsWith(searchTextNormalized));
            });
          }                   
          
          
}
