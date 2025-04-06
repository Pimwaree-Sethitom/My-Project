import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';
import { ResearchService , PaperDetail ,Workload,Researcher} from '../services/research.service';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-research',
  standalone: true, 
  imports: [ CommonModule, 
             ResearchBarComponent, 
             RouterModule, 
             FormsModule,
             ReactiveFormsModule,
          ], 
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
  providers: [ResearchService]
})
export class ResearchComponent implements OnInit{
        EditPaperForm: FormGroup;
        paperdetail: PaperDetail[] = [];
        researchers: Researcher[] = [];
        workload: Workload[] = [];
        searchText: string = ''; 
        searchField: keyof PaperDetail = 'title_thai';
        filteredResearchers: any[] = [];
        filteredPaperdetail: PaperDetail[] = []; 
        filteredWorkload: any[] = [];
        selectedPaper: PaperDetail | null = null;
        workloadCount: string = '';
        selectedResearcher: any;
        searchResearchers: string = '';  
        
        // private researchService = inject(ResearchService);

        constructor(private fb: FormBuilder, private researchService: ResearchService) {
          this.EditPaperForm = this.fb.group({
            paper_researcher_id: ['', []],
            title_thai: ['', []],
            title_english: ['', []],
            name: ['', Validators.required],
            author_role: ['', Validators.required],
            workload_year_id: ['', Validators.required],
            workload_count: ['', Validators.required],
            proportion: ['', []],
            number_of_workloads: ['', []],
            journal_or_conference_name: ['', Validators.required],
            type_id: ['', Validators.required],
            publication_year: ['', []],
            issue_number: ['', []],
            start_date: ['', Validators.required],
            end_date: ['', []],
            ISSN_or_ISBN: ['', []],
            page_range: ['', []],
            academic_quality: ['', Validators.required],
            quartile_id: ['', Validators.required],
            link: ['', []],
            Remark: ['', []],
            detail: ['', []],
            thai_calender_year: ['', Validators.required],
            fiscal_year: ['', Validators.required],
            academic_year: ['', Validators.required],
          });
        }

        ngOnInit(): void { 
          this.EditPaperForm.get('workload_year_id')?.valueChanges.subscribe(selectedId => {
            // หาค่า workload_count จาก filteredWorkload ตามที่เลือก
            const selectedWorkload = this.filteredWorkload.find(workload => workload.workload_year_id === selectedId);
            
            if (selectedWorkload) {
              this.EditPaperForm.patchValue({
                workload_count: selectedWorkload.workload_count
              });
        
              // คำนวณค่า number_of_workloads ใหม่
              this.updateNumberOfWorkloads();
            }
          });
        
          this.EditPaperForm.get('proportion')?.valueChanges.subscribe(() => {
            this.updateNumberOfWorkloads();
          });
        
          this.EditPaperForm.get('workload_count')?.valueChanges.subscribe(() => {
            this.updateNumberOfWorkloads();
          });
          this.SelectPaper();
          this.SelectWorkload();
          this.SelectResearchers();
        }

        SelectResearchers() {
          this.researchService.SelectUserData().subscribe((data: any[]) => {
            this.researchers = data;
            this.filteredResearchers = data;  
          });
        }
      
        SearchResearchers() {
          if (this.searchResearchers) {
            this.filteredResearchers = this.researchers.filter((researcher) =>
              researcher.name.toLowerCase().includes(this.searchResearchers.toLowerCase())
                ).slice(0, 5);  
               } else {
              this.filteredResearchers = this.researchers.slice(0, 5);  
            }
          }
 
        selectResearcher(researcher: any) {
          this.selectedResearcher = researcher;
          this.searchResearchers = researcher.name;  
          this.filteredResearchers = [];  
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

        DeletePaper(paper_researcher_id: any) {
            const body = { paper_researcher_id: paper_researcher_id };
            this.researchService.DeletePaper(body).subscribe(result => {
                if (result.alert == 'Delete success') {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    }
                  });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.'
                    });
                }
                this.SelectPaper();
            });
        }

        editPaper(paper_researcher_id: number): void {
          this.selectedPaper = this.paperdetail.find(paper => paper.paper_researcher_id === paper_researcher_id) || null;
          
          if (this.selectedPaper) {
            this.EditPaperForm.patchValue({
              paper_researcher_id: this.selectedPaper.paper_researcher_id,
              title_thai: this.selectedPaper.title_thai ,
              title_english: this.selectedPaper.title_english ,
              name: this.selectedPaper.name ,
              author_role: this.selectedPaper.author_role ,
              workload_year_id: this.selectedPaper.workload_year_id ,
              workload_count: this.selectedPaper.workload_count ,
              proportion: this.selectedPaper.proportion ,
              number_of_workloads: this.selectedPaper.number_of_workloads ,
              journal_or_conference_name: this.selectedPaper.journal_or_conference_name ,
              type_id: this.selectedPaper.type_id ,
              publication_year: this.selectedPaper.publication_year ,
              issue_number: this.selectedPaper.issue_number ,
              start_date: this.selectedPaper.start_date ,
              end_date: this.selectedPaper.end_date ,
              ISSN_or_ISBN: this.selectedPaper.ISSN_or_ISBN ,
              page_range: this.selectedPaper.page_range ,
              academic_quality: this.selectedPaper.academic_quality,
              quartile_id: this.selectedPaper.quartile_id ,
              link: this.selectedPaper.link ,
              Remark: this.selectedPaper.Remark ,
              detail: this.selectedPaper.detail ,
              thai_calender_year: this.selectedPaper.thai_calender_year,
              fiscal_year: this.selectedPaper.fiscal_year ,
              academic_year: this.selectedPaper.academic_year,
            });
        
            const modal = new Modal(document.getElementById('editPaperModal')!);
            modal.show();
          }
        }
        
        
        updatePaper(): void {
          if (!this.selectedPaper) return;
        
          const updatedData = this.EditPaperForm.value;
        
          this.researchService.UpdatePaper(updatedData).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Updated Successfully',
                text: 'งานวิจัยได้รับการอัปเดตเรียบร้อยแล้ว'
              });
              this.SelectPaper(); // โหลดข้อมูลใหม่หลังอัปเดต
              const modal = Modal.getInstance(document.getElementById('editPaperModal')!)!;
              modal.hide(); // ปิด Modal หลังอัปเดต
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'เกิดข้อผิดพลาดในการอัปเดต กรุณาลองใหม่อีกครั้ง'
              });
            }
          });
        }
        
        
        SelectWorkload() {
          this.researchService.SelectWorkload().subscribe((data: Workload[]) => {
            this.workload = data;
            this.filteredWorkload = data;  
          });
        }
  
        updateNumberOfWorkloads(): void {
          const workload_count = this.EditPaperForm.get('workload_count')?.value || 0;
          const proportion = this.EditPaperForm.get('proportion')?.value || 0;
        
          const number_of_workloads = (workload_count * proportion) / 100;
        
          this.EditPaperForm.patchValue({ number_of_workloads: number_of_workloads.toFixed(2) });
        }
            
        
}


