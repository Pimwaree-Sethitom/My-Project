import { Component, OnInit } from '@angular/core';
import { ResearchService , Workload } from '../services/research.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-workload',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    AdminBarComponent,
  ],
  templateUrl: './workload.component.html',
  styleUrl: './workload.component.css',
  providers: [ResearchService]
})
export class WorkloadComponent implements OnInit{
  workload: Workload[] = [];
  filteredWorkload: any[] = [];
  workloadForm: FormGroup;
  selectedworkload: Workload | null = null;

  constructor(private fb: FormBuilder, private researchService: ResearchService) {
    this.workloadForm = this.fb.group({
      workload_year_id: ['', []],
      workload_topic: ['', Validators.required],
      workload_count: ['', Validators.required],
      workload_year: ['', Validators.required],
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

          isInvalid(controlName: string): boolean {
                    const control = this.workloadForm.get(controlName);
                    return !!(control && control.invalid && (control.dirty || control.touched));
          }
          
          onSubmit() {
            this.workloadForm.markAllAsTouched();
            if (this.workloadForm.invalid) {
              Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
                text: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
              });
              return;  
            }
          
            this.researchService.InsertWorkload(this.workloadForm.value).subscribe({
              next: (response) => { 

                if (response.alert === "ข้อมูลภาระงานนี้มีอยู่ในระบบแล้ว") {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'ข้อมูลซ้ำ!',
                                  text: 'ข้อมูลภาระงานนี้มีอยู่ในระบบแล้ว',
                                });
                                return;
                              } 

                if (response.alert === "เพิ่มข้อมูลสำเร็จ") {
                  Swal.fire({
                    icon: 'success',
                    title: 'เพิ่มข้อมูลสำเร็จ!',
                    text: 'The paper data has been added successfully.',
                  });
                  this.SelectWorkload();
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
            this.workloadForm.reset(); 
          }

          Delete(workload_year_id: any){
            Swal.fire({
                        title: "คุณแน่ใจนะ?",
                        text: "หากลบแล้วคุณจะไม่สามารถย้อนกลับได้ !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ลบ",
                        cancelButtonText: "ยกเลิก"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const body = { workload_year_id: workload_year_id };
                          this.researchService.DeleteWorkload(body).subscribe((response) => {
                            if (response.alert == 'Delete success') {
                              Swal.fire({
                                title: "ลบแล้ว!",
                                text: "ข้อมูลถูกลบเสร็จสิ้นแล้ว",
                                icon: "success"
                              });
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: 'ไม่สามารถลบได้!',
                                text: 'มีบางอย่างผิดพลาด! โปรดลองอีกครั้ง'
                              });
                            }
                            this.SelectWorkload();
                          });
                        }
                      });
          }

          Edit(workload_year_id: number): void{
            this.selectedworkload = this.workload.find(ww => ww.workload_year_id === workload_year_id) || null;

            if (this.selectedworkload) {
              this.workloadForm.patchValue({
                workload_year_id: this.selectedworkload.workload_year_id,
                workload_topic: this.selectedworkload.workload_topic ,
                workload_count: this.selectedworkload.workload_count ,
                workload_year: this.selectedworkload.workload_year ,
              });
              const modal = new Modal(document.getElementById('editModal')!);
            modal.show();
          }
          }

          Update(): void {
            if (!this.selectedworkload) return;
          
            const updatedData = this.workloadForm.value;
          
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
          
            // ส่งข้อมูลไปยัง PHP เพื่อทำการอัปเดต
            this.researchService.UpdateWorkload(updatedData).subscribe({
              next: (response) => {
        
                if (response.alert === 'ข้อมูลภาระงานนี้มีอยู่ในระบบแล้ว') {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'ข้อมูลซ้ำ!',
                                    text: 'ข้อมูลภาระงานนี้มีอยู่ในระบบแล้ว',
                                });
                                return; // หยุดการทำงานต่อ
                            }
          
                // แสดงข้อความสำเร็จ
                Swal.fire({
                  icon: 'success',
                  title: 'อัปเดตสำเร็จ',
                  text: response.alert || 'อัปเดตเรียบร้อยแล้ว',
                });
          
                // รีเฟรชข้อมูล
                this.SelectWorkload();
                const modal = Modal.getInstance(document.getElementById('editModal')!)!;
                modal.hide();
              },
              error: (error) => {
                console.error("Error from server:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาด',
                  text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ หรือมีปัญหาในการอัปเดต',
                });
              }
            });
          }
          

          hasChanges(updatedData: any): boolean {
            if (!this.selectedworkload) return false;
          
            return updatedData.workload_topic !== this.selectedworkload.workload_topic ||
                   updatedData.workload_count !== this.selectedworkload.workload_count ||
                   updatedData.workload_year !== this.selectedworkload.workload_year ;
                  
          }


}
