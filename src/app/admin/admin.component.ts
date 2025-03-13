import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Researcher } from '../api.service';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule, AdminBarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiService] 
})
export class AdminComponent implements OnInit {
  researchers: Researcher[] = [];
  searchText: string = ''; 
  searchField: keyof Researcher = 'name';
  filteredResearchers: Researcher[] = []; 

  private apiService = inject(ApiService); 

  ngOnInit(): void { 
    this.SelectResearchers();
  }

  SelectResearchers() { 
    this.apiService.SelectUserData().subscribe((data: Researcher[]) => {
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

  editUser(researcherId: number) {
    // หาข้อมูลของผู้ใช้ที่ต้องการแก้ไข
    const researcher = this.researchers.find(r => r.researcher_id === researcherId);
  
    if (researcher) {
      // ใช้ SweetAlert2 แสดงฟอร์มให้กรอกข้อมูลใหม่
      Swal.fire({
        title: 'Update Form',
        html: `
          <input type="text" id="name" class="swal2-input" value="${researcher.name}" placeholder="Enter Name">
          <input type="text" id="name_department_eng" class="swal2-input" value="${researcher.name_department_eng}" placeholder="Enter English Department Name">
          <input type="text" id="name_department_thai" class="swal2-input" value="${researcher.name_department_thai}" placeholder="Enter Thai Department Name">
          <input type="text" id="role_name" class="swal2-input" value="${researcher.role_name}" placeholder="Enter Role Name">
        `,
        confirmButtonText: 'UPDATE',
        focusConfirm: false,
        preConfirm: () => {
          const name = (document.getElementById('name') as HTMLInputElement).value;
          const name_department_eng = (document.getElementById('name_department_eng') as HTMLInputElement).value;
          const name_department_thai = (document.getElementById('name_department_thai') as HTMLInputElement).value;
          const role_name = (document.getElementById('role_name') as HTMLInputElement).value;
  
          // ตรวจสอบว่าทุกฟิลด์มีข้อมูลครบถ้วน
          if (!name || !name_department_eng || !name_department_thai || !role_name) {
            Swal.showValidationMessage('Please fill in all fields');
            return false;
          }
  
          // ส่งข้อมูลที่กรอกไปยัง API
          return { name, name_department_eng, name_department_thai, role_name };
        }
      }).then(result => {
        if (result.isConfirmed) {
          const { name, name_department_eng, name_department_thai, role_name } = result.value;
  
          const updatedUserData = {
            researcher_id: researcher.researcher_id,
            name: name,
            name_department_eng: name_department_eng,
            name_department_thai: name_department_thai,
            role_name: role_name
          };
  
          // เรียกใช้ API สำหรับการอัปเดต
          this.apiService.updateUser(updatedUserData).subscribe({
            next: (response) => {
              if (response.alert === 'Update success') {
                Swal.fire('Updated!', 'The user details have been updated.', 'success');
                this.SelectResearchers(); // รีเฟรชข้อมูลหลังอัปเดต
              } else {
                Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
              }
            },
            error: (error) => {
              Swal.fire('Error!', 'There was an issue connecting to the server.', 'error');
            },
            complete: () => {
              // การทำงานหลังจากเสร็จสิ้น
            }
          });
        }
      });
    }
  }
  
  deleteUser(researcher_id: any) {
    const body = { researcher_id: researcher_id };
    this.apiService.deleteUser(body).subscribe(result => {
        if (result.alert == 'Delete success') {
            Swal.fire({
                icon: 'success',
                title: 'Delete success',
                text: 'The user has been deleted successfully.'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.'
            });
        }
        this.SelectResearchers();
    });
}

  
}
