import { Component, OnInit } from '@angular/core';
import { ResearchService,Quartile  } from '../services/research.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-quartile',
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    AdminBarComponent,
  ],
  templateUrl: './quartile.component.html',
  styleUrl: './quartile.component.css',
  providers: [ResearchService]
})
export class QuartileComponent implements OnInit{
  quartile: Quartile[] = [];
  filteredQuartile: any[] = [];
  QuartileForm: FormGroup;
  selectedQuartile: Quartile | null = null;

  constructor(private fb: FormBuilder, private researchService: ResearchService) {
    this.QuartileForm = this.fb.group({
      quartile_id: ['', []],
      quartile_rank: ['', Validators.required],
    });  
  }

  ngOnInit(): void { 
    this.SelectQuartile();
  }
  
  SelectQuartile() {
      this.researchService.SelectQuartile().subscribe((data: Quartile[]) => {
      this.quartile = data;
      this.filteredQuartile = data;  
      });
    }

  isInvalid(controlName: string): boolean {
                        const control = this.QuartileForm.get(controlName);
                        return !!(control && control.invalid && (control.dirty || control.touched));
    }
              
    onSubmit() {
                this.QuartileForm.markAllAsTouched();
                if (this.QuartileForm.invalid) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
                    text: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
                  });
                  return;  
                }
              
                this.researchService.InsertQuartile(this.QuartileForm.value).subscribe({
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
                      this.SelectQuartile();
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
      this.QuartileForm.reset(); 
    }

  Delete(quartile_id: any){
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
                              const body = { quartile_id: quartile_id };
                              this.researchService.DeleteQuartile(body).subscribe((response) => {
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
                                this.SelectQuartile();
                              });
                            }
                          });
    }

    Edit(quartile_id: number): void{
      this.selectedQuartile = this.quartile.find(ww => ww.quartile_id === quartile_id) || null;
  
      if (this.selectedQuartile) {
        this.QuartileForm.patchValue({
          quartile_id: this.selectedQuartile.quartile_id,
          quartile_rank: this.selectedQuartile.quartile_rank ,
        });
        const modal = new Modal(document.getElementById('editModal')!);
      modal.show();
    }
    }

     Update(): void{
    
        if (!this.selectedQuartile) return;
                  
                    const updatedData = this.QuartileForm.value;
                  
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
    
        this.researchService.UpdateQuartile(this.QuartileForm.value).subscribe({
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
              this.SelectQuartile();
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
      if (!this.selectedQuartile) return false;
    
      return updatedData.quartile_rank !== this.selectedQuartile.quartile_rank ;
            
    }
  
}
