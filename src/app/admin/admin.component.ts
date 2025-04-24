import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Researcher } from '../api.service';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule, AdminBarComponent ,ReactiveFormsModule,TableModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiService] 
})
export class AdminComponent implements OnInit {
  researchers: Researcher[] = [];
  searchText: string = ''; 
  searchField: keyof Researcher = 'name';
  filteredResearchers: Researcher[] = []; 
  userForm: FormGroup;
  selectedResearch: Researcher | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userForm = this.fb.group({
      researcher_id: ['',[]],
      name: ['', Validators.required],
      name_department_eng: ['', []],
      name_department_thai: ['', Validators.required],
      role_id: ['', Validators.required],
      remark: ['',[]]
    });
  }

        Closemodal(){
          this.userForm.reset(); 
        }

        onSubmit(): void {
          this.userForm.markAllAsTouched();

          if (this.userForm.invalid) {
              Swal.fire({
                  icon: 'warning',
                  title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
                  text: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
              });
              return;
          }

          this.apiService.insertUser(this.userForm.value).subscribe({
              next: (response) => {
                  // ตรวจสอบว่า API ส่งกลับว่า "ข้อมูลซ้ำ" หรือไม่
                  if (response.alert === 'ข้อมูลนี้มีอยู่แล้วในระบบ.') {
                      Swal.fire({
                          icon: 'error',
                          title: 'ข้อมูลซ้ำ!',
                          text: 'ข้อมูลผู้ใช้งานนี้มีอยู่แล้วในระบบ',
                      });
                      return; // หยุดการทำงานต่อ
                  }

                  // ถ้าข้อมูลไม่ซ้ำ ทำการรีเซ็ตฟอร์มและแสดงข้อความสำเร็จ
                  this.userForm.reset();
                  Swal.fire({
                      icon: 'success',
                      title: 'เพิ่มผู้ใช้งานสำเร็จ!',
                      text: 'ระบบได้เพิ่มข้อมูลผู้ใช้งานเรียบร้อยแล้ว',
                  }).then(() => {
                      this.SelectResearchers();
                  });
              },
              error: (error) => {
                  console.error('Error inserting user', error);
                  Swal.fire({
                      icon: 'error',
                      title: 'เกิดข้อผิดพลาด!',
                      text: 'ไม่สามารถเพิ่มข้อมูลผู้ใช้งานได้ กรุณาลองใหม่อีกครั้ง',
                  });
              }
          });
        }
      
        isInvalid(controlName: string): boolean {
          const control = this.userForm.get(controlName);
          return !!(control && control.invalid && (control.dirty || control.touched));
        }
        
        ngOnInit(): void { 
          this.SelectResearchers();
        }

        SelectResearchers() { 
          this.apiService.SelectUserData().subscribe((data: Researcher[]) => {
            console.log('DATA:', data);
            this.researchers = data;
            this.filteredResearchers = data; 
          });
        }

        SearchResearchers() {
          // ค้นหาตามฟิลด์ที่เลือกใน dropdown
          this.filteredResearchers = this.researchers.filter((researcher) => {
            // ตรวจสอบและแปลงค่าเป็น string ก่อนใช้ toLowerCase()
            const fieldValue = String(researcher[this.searchField]); // แปลงค่าทุกประเภทให้เป็น string
            return fieldValue.toLowerCase().includes(this.searchText.toLowerCase());
          });
        }

        editUser(researcher_id: number): void {
          this.selectedResearch = this.researchers.find(r => r.researcher_id === researcher_id) || null;
        
          if (this.selectedResearch) {
            // กรอกข้อมูลเดิมที่เลือกลงในฟอร์ม
            this.userForm.patchValue({
              researcher_id: this.selectedResearch.researcher_id,
              name: this.selectedResearch.name,
              name_department_eng: this.selectedResearch.name_department_eng,
              name_department_thai: this.selectedResearch.name_department_thai,
              role_id: this.selectedResearch.role_id,
              remark: this.selectedResearch.remark,
            });
            
            // แสดง modal
            const modal = new Modal(document.getElementById('editPaperModal')!);
            modal.show();
          }
        }
        
        updateUser(): void {
          if (!this.selectedResearch) return;
        
          const updatedData = this.userForm.value;
        
          // ตรวจสอบว่าข้อมูลที่กรอกมีการเปลี่ยนแปลงจากข้อมูลเดิมหรือไม่
          const hasChanges = this.hasChanges(updatedData);
        
          if (!hasChanges) {
            Swal.fire({
              icon: 'warning',
              title: 'ไม่มีการเปลี่ยนแปลง!',
              text: 'ข้อมูลที่คุณกรอกไม่แตกต่างจากข้อมูลเดิม'
            });
            return; // หยุดการทำงานหากไม่มีการเปลี่ยนแปลง
          }
        
          this.apiService.updateUser(updatedData).subscribe({
            next: (response) => {
              // ตรวจสอบว่า API ส่งกลับว่า "ข้อมูลซ้ำ" หรือไม่
              if (response.alert === 'ข้อมูลนี้มีอยู่แล้วในระบบ.') {
                Swal.fire({
                    icon: 'error',
                    title: 'ข้อมูลซ้ำ!',
                    text: 'ข้อมูลผู้ใช้งานนี้มีอยู่แล้วในระบบ',
                });
                return; // หยุดการทำงานต่อ
            }
            // ถ้าข้อมูลไม่ซ้ำ ทำการรีเซ็ตฟอร์มและแสดงข้อความสำเร็จ
            this.userForm.reset();
              Swal.fire({
                icon: 'success',
                title: 'เสร็จสิ้น!',
                text: 'ข้อมูลผู้ใช้ได้รับการอัปเดตเรียบร้อยแล้ว'
              });
              this.SelectResearchers();
              const modal = Modal.getInstance(document.getElementById('editPaperModal')!)!;
              modal.hide(); 
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถอัปเดตข้อมูลได้!',
                text: 'เกิดข้อผิดพลาดในการอัปเดต กรุณาลองใหม่อีกครั้ง'
              });
            }
          });
        }
  
 
        hasChanges(updatedData: any): boolean {
          if (!this.selectedResearch) {
            return false;
          }
        
          return updatedData.name !== this.selectedResearch.name || 
                updatedData.name_department_eng !== this.selectedResearch.name_department_eng ||
                updatedData.name_department_thai !== this.selectedResearch.name_department_thai ||
                updatedData.remark !== this.selectedResearch.remark ||
                updatedData.role_id !== this.selectedResearch.role_id;
        }  
  
        deleteUser(researcher_id: any) {
            const body = { researcher_id: researcher_id };
        
            // แสดงยืนยันการลบก่อน
            Swal.fire({
                title: "คุณแน่ใจนะ?",
                text: "หากลบแล้วคุณจะไม่สามารถย้อนกลับได้ !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ลบ",
                cancelButtonText: "ยกเลิก",
            }).then((result) => {
                if (result.isConfirmed) {
                    // ถ้าผู้ใช้ยืนยันให้ลบ
                    this.apiService.deleteUser(body).subscribe(result => {
                        if (result.alert == 'Delete success') {
                            Swal.fire({
                                title: "ลบแล้ว!",
                                text: "ข้อมูลถูกลบเสร็จสิ้นแล้ว",
                                icon: "success"
                            });
                            this.SelectResearchers();  // โหลดข้อมูลใหม่หลังจากลบ
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'ไม่สามารถลบได้!',
                                text: 'มีบางอย่างผิดพลาด! โปรดลองอีกครั้ง'
                            });
                        }
                    });
                }
            });
        }        

  
}
