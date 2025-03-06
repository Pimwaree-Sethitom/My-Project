import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true, // ทำให้เป็น Standalone Component
  imports: [CommonModule], // เพิ่ม CommonModule ถ้าคุณใช้ ngIf หรือ ngFor
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {

}
