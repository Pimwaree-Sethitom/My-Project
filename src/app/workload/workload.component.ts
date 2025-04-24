import { Component, OnInit } from '@angular/core';
import { ResearchService , Workload } from '../services/research.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';

@Component({
  selector: 'app-workload',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workload.component.html',
  styleUrl: './workload.component.css',
  providers: [ResearchService]
})
export class WorkloadComponent implements OnInit{
  workload: Workload[] = [];
  filteredWorkload: any[] = [];
  workloadForm: FormGroup;

  constructor(private fb: FormBuilder, private researchService: ResearchService) {
    this.workloadForm = this.fb.group({
      workload_year_id: ['', []],
      workload_topic: ['', Validators.required],
      workload_count: ['', Validators.required],
      workload_year: ['', []],
    });  
  }

  ngOnInit(): void { 
    this.SelectWorkload();
  }

  SelectWorkload() {
    this.researchService.SelectWorkload().subscribe((data: Workload[]) => {
      this.workload = data;
      this.filteredWorkload = data;  
    });
  }

  onSubmit(){
    
  }
}
