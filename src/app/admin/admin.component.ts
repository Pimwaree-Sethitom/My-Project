import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Researcher } from '../api.service';
import { FormsModule } from '@angular/forms'; // เพิ่มการ import FormsModule
import { RouterModule } from '@angular/router';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';
import { AddUserComponent  } from '../add-user/add-user.component';

@Component({
  selector: 'app-admin',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule, AdminBarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiService] // ✅ เพิ่ม providers สำหรับ standalone component
})
export class AdminComponent implements OnInit {
  researchers: Researcher[] = [];
  searchText: string = ''; // สร้างตัวแปรสำหรับเก็บข้อความที่ค้นหา
  searchField: keyof Researcher = 'name';
  filteredResearchers: Researcher[] = []; // สร้างตัวแปรเก็บผลลัพธ์ที่ค้นหา

  private apiService = inject(ApiService); // ✅ ใช้ inject() แทน constructor

  ngOnInit(): void { // ✅ เพิ่มเมธอด ngOnInit
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
}
