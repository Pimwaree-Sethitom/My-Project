import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true, // ทำให้เป็น Standalone Component
  imports: [CommonModule], // เพิ่ม CommonModule ถ้าคุณใช้ ngIf หรือ ngFor
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
