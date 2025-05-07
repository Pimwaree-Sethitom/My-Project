import { Component, OnInit } from '@angular/core';
import { ResearchService,ResearchType  } from '../services/research.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-research-type',
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    AdminBarComponent,
  ],
  templateUrl: './research-type.component.html',
  styleUrl: './research-type.component.css',
  providers: [ResearchService]
})
export class ResearchTypeComponent implements OnInit{
  researchType: ResearchType[] = [];
  filteredResearchType: any[] = [];
  researchTypeForm: FormGroup;
  selectedresearchType: ResearchType | null = null;

  constructor(private fb: FormBuilder, private researchService: ResearchService) {
    this.researchTypeForm = this.fb.group({
      type_id: ['', []],
      type_name: ['', Validators.required],
    });  
  }

  ngOnInit(): void { 
    this.SelectResearchType();
  }

  SelectResearchType() {
              this.researchService.SelectResearchType().subscribe((data: ResearchType[]) => {
                this.researchType = data;
                this.filteredResearchType = data;  
              });
  }

  isInvalid(controlName: string): boolean {
                      const control = this.researchTypeForm.get(controlName);
                      return !!(control && control.invalid && (control.dirty || control.touched));
  }
            
  onSubmit() {
              this.researchTypeForm.markAllAsTouched();
              if (this.researchTypeForm.invalid) {
                Swal.fire({
                  icon: 'warning',
                  title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
                  text: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
                });
                return;  
              }
            
              this.researchService.InsertResearchType(this.researchTypeForm.value).subscribe({
                next: (response) => { 
  
                  if (response.alert === "ข้อมูลนี้มีอยู่ในระบบแล้ว") {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'ข้อมูลซ้ำ!',
                                    text: 'ข้อมูลนี้มีอยู่ในระบบแล้ว',
                                  });
                                  return;
                                } 
  
                  if (response.alert === "เพิ่มข้อมูลสำเร็จ") {
                    Swal.fire({
                      icon: 'success',
                      title: 'เพิ่มข้อมูลสำเร็จ!',
                      text: 'The paper data has been added successfully.',
                    });
                    this.SelectResearchType();
                    return;
                  }
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
            
  Closemodal(){
    this.researchTypeForm.reset(); 
  }

  Delete(type_id: any){
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
                            const body = { type_id: type_id };
                            this.researchService.DeleteResearchType(body).subscribe((response) => {
                              if (response.alert == 'Delete success') {
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your file has been deleted.",
                                  icon: "success"
                                });
                              } else {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: 'Something went wrong! Please try again.'
                                });
                              }
                              this.SelectResearchType();
                            });
                          }
                        });
  }

  Edit(type_id: number): void{
    this.selectedresearchType = this.researchType.find(ww => ww.type_id === type_id) || null;

    if (this.selectedresearchType) {
      this.researchTypeForm.patchValue({
        type_id: this.selectedresearchType.type_id,
        type_name: this.selectedresearchType.type_name ,
      });
      const modal = new Modal(document.getElementById('editModal')!);
    modal.show();
  }
  }

  Update(): void{

    if (!this.selectedresearchType) return;
              
                const updatedData = this.researchTypeForm.value;
              
                // ตรวจสอบว่ามีการเปลี่ยนแปลงข้อมูลหรือไม่
                const hasChanges = this.hasChanges(updatedData);
                
                if (!hasChanges) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'ไม่มีการเปลี่ยนแปลง!',
                    text: 'ข้อมูลที่คุณกรอกไม่แตกต่างจากข้อมูลเดิม',
                  });
                  return;
                }

    this.researchService.UpdateResearchType(this.researchTypeForm.value).subscribe({
      next: (response) => { 

        if (response.alert === "ชื่อประเภทนี้ถูกใช้ไปแล้ว") {
                        Swal.fire({
                          icon: 'error',
                          title: 'ข้อมูลซ้ำ!',
                          text: 'ชื่อประเภทนี้ถูกใช้ไปแล้ว',
                        });
                        return;
                      } 

        if (response.alert === "อัปเดตข้อมูลสำเร็จ") {
          Swal.fire({
            icon: 'success',
            title: 'อัปเดตข้อมูลสำเร็จ!',
            text: 'The paper data has been added successfully.',
          });
          this.SelectResearchType();
          return;
        }
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

  hasChanges(updatedData: any): boolean {
    if (!this.selectedresearchType) return false;
  
    return updatedData.type_name !== this.selectedresearchType.type_name ;
          
  }
}
