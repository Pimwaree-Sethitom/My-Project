import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Researcher } from '../api.service';
import { FormsModule } from '@angular/forms'; // เพิ่มการ import FormsModule
import { RouterModule } from '@angular/router';
import { AdminBarComponent } from '../admin-bar/admin-bar.component';

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
    this.filteredResearchers = this.researchers.filter((researcher) => {
      return researcher.name.toLowerCase().includes(this.searchText.toLowerCase()); // ค้นหาจากชื่อ
    });
  }
}
