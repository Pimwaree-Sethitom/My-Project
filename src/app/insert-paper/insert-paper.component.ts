import { Component, OnInit } from '@angular/core';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';
import { ResearchService, Researcher,Workload } from '../services/research.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-paper',
  standalone: true, 
  imports: [ResearchBarComponent, RouterModule, ReactiveFormsModule, CommonModule,AutoCompleteModule],
  templateUrl: './insert-paper.component.html',
  styleUrl: './insert-paper.component.css',
  providers: [ResearchService]
})
export class InsertPaperComponent implements OnInit{
  researchers: Researcher[] = [];
  workload: Workload[] = [];
  paperForm : FormGroup;
  searchText: string = '';   
  filteredResearchers: any[] = []; 
  filteredWorkload: any[] = [];
  selectedResearcher: any; 
  workloadCount: string = ''; 

    constructor(private fb: FormBuilder, private researchService: ResearchService) {
        this.paperForm = this.fb.group({
          title_thai: ['', []],
          title_english: ['', []],
          researcher_name: ['', Validators.required],
          author_role: ['', Validators.required],
          workload_year_id: ['', Validators.required],
          // workload_count: ['', Validators.required],
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
        this.SelectResearchers();
        this.SelectWorkload();
      }
    
      onSubmit() {
        if (this.paperForm.invalid) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
            text: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
          });
          return;  
        }

        this.researchService.insertPaperData(this.paperForm.value).subscribe({
          next: (response) => {
            if (response.alert && response.alert === "Researcher name not found.") {
              Swal.fire({
                icon: 'error',
                title: 'ไม่พบชื่อผู้วิจัย!',
                text: 'โปรดตรวจสอบชื่อผู้วิจัยอีกครั้ง',
              });
              return;
            }
            Swal.fire({
              icon: 'success',
              title: 'เพิ่มข้อมูลสำเร็จ!',
              text: 'The paper data has been added successfully.',
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด!',
              text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่',
            });
          }
        });
        
      }      

          SelectResearchers() {
            this.researchService.SelectUserData().subscribe((data: any[]) => {
              this.researchers = data;
              this.filteredResearchers = data;  
            });
          }
        
          SearchResearchers() {
            if (this.searchText) {
              this.filteredResearchers = this.researchers.filter((researcher) =>
                researcher.name.toLowerCase().includes(this.searchText.toLowerCase())
                  ).slice(0, 5);  
                 } else {
                this.filteredResearchers = this.researchers.slice(0, 5);  
              }
            }
   
          selectResearcher(researcher: any) {
            this.selectedResearcher = researcher;
            this.searchText = researcher.name;  
            this.filteredResearchers = [];  
          }

          SelectWorkload() {
            this.researchService.SelectWorkload().subscribe((data: Workload[]) => {
              this.workload = data;
              this.filteredWorkload = data;  
            });
          }

          onWorkloadSelect(event: any): void {
            const selectedWorkloadId = event.target.value;  // รับค่า workload_year_id ที่ผู้ใช้เลือก
            const selectedWorkload = this.filteredWorkload.find(workload => workload.workload_year_id === selectedWorkloadId);  // ค้นหาข้อมูลที่ตรง
        
            if (selectedWorkload) {
              this.workloadCount = selectedWorkload.workload_count || '';  // อัปเดตค่าจำนวนนับภาระงาน
            }
          }

          onProportionChange(): void {
            const proportionValue = parseFloat(this.paperForm.value.proportion);  // แปลงค่า proportion เป็นตัวเลข
            const workloadCountValue = parseFloat(this.workloadCount.toString());  // แปลงค่า workloadCount เป็นตัวเลข
          
            if (!isNaN(proportionValue) && !isNaN(workloadCountValue)) {
              const result = (proportionValue * workloadCountValue) / 100;
              this.paperForm.patchValue({ number_of_workloads: result });
            }
          }
          
          
}
