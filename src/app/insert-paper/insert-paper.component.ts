import { Component, OnInit } from '@angular/core';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';
import { ResearchService, Researcher } from '../services/research.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-paper',
  standalone: true, 
  imports: [ResearchBarComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './insert-paper.component.html',
  styleUrl: './insert-paper.component.css',
  providers: [ResearchService]
})
export class InsertPaperComponent {
  researchers: Researcher[] = [];
  paperForm : FormGroup;
  searchText: string = ''; 
  filteredResearchers: Researcher[] = []; 

    constructor(private fb: FormBuilder, private researchService: ResearchService) {
        this.paperForm = this.fb.group({
          title_thai: ['', []],
          title_english: ['', []],
          type_id: ['', Validators.required],
          journal_or_conference_name: ['', Validators.required],
          publication_year: ['', []],
          issue_number: ['', []],
          start_date: ['', []],
          end_date: ['', []],
          ISSN_or_ISBN: ['', []],
          page_range: ['', []],
          quartile_id: ['', Validators.required],
          academic_quality: ['', Validators.required],
          Remark: ['', []],
          detail: ['', []],
          link: ['', []],
          author_role: ['', Validators.required],
          workload_year_id: ['', Validators.required],
          proportion: ['', []],
          number_of_workloads: ['', []],
          fiscal_year: ['', Validators.required],
          thai_calendar_year: ['', Validators.required],
          academic_year: ['', Validators.required],
          researcher_id: ['', Validators.required] // ID ของนักวิจัยที่เลือก
        });
      }

      
        onSubmit() {
          if (this.paperForm.valid) {
            this.researchService.insertPaperData(this.paperForm.value).subscribe({
              next: (response) => {
                console.log('inserted successfully', response);
                Swal.fire({
                  icon: 'success',
                  title: 'inserted successfully!',
                  text: 'The user has been added successfully.',
                });
              },
              error: (error) => {
                console.error('Error inserting', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'There was an error inserting the user.',
                });
              }
            });
            
          }
        }
        
          SelectResearchers() { 
            this.researchService.SelectUserData().subscribe((data: Researcher[]) => {
              this.researchers = data;
              this.filteredResearchers = data; 
            });
          }

          SearchResearchers() {
            this.filteredResearchers = this.researchers.filter((researcher) => {
              return researcher.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
          }
}
