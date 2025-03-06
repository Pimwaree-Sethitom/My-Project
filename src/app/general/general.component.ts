import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general',
  standalone: true, // ทำให้เป็น Standalone Component
  imports: [CommonModule], // เพิ่ม CommonModule ถ้าคุณใช้ ngIf หรือ ngFor
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

}
