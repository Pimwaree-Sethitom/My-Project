import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-executive',
  standalone: true, // ทำให้เป็น Standalone Component
  imports: [CommonModule], // เพิ่ม CommonModule ถ้าคุณใช้ ngIf หรือ ngFor
  templateUrl: './executive.component.html',
  styleUrl: './executive.component.css'
})
export class ExecutiveComponent {

}
