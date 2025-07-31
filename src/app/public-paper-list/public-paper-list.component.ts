import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { PublicPaperService,PaperDetail } from '../services/public-paper.service';
import { NavbarForExecutiveProfileComponent } from '../navbar-for-executive-profile/navbar-for-executive-profile.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-paper-list',
  templateUrl: './public-paper-list.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarForExecutiveProfileComponent,RouterModule] ,
  styleUrl: './public-paper-list.component.css',
})
export class PublicPaperListComponent implements OnInit{
  paperdetail: PaperDetail[] = [];
  searchText: string = ''; 
  searchField: keyof PaperDetail = 'title_thai';
  filteredPaperdetail: PaperDetail[] = []; 

  constructor( private PublicPaperService: PublicPaperService) {}

  ngOnInit(): void {
    this.SelectPaper();
  }

  SelectPaper() { 
              this.PublicPaperService.SelectPaperData().subscribe((data: PaperDetail[]) => {
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
              return fieldValue.includes(searchTextNormalized);
            });
          } 

}


