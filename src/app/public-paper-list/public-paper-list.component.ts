import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { registerSarabunFont } from './font-sarabun';
import { NavbarForExecutiveProfileComponent } from
        '../navbar-for-executive-profile/navbar-for-executive-profile.component';

@Component({
  selector: 'app-public-paper-list',
  standalone: true,
  templateUrl: './public-paper-list.component.html',
  styleUrls: ['./public-paper-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarForExecutiveProfileComponent
  ]
})
export class PublicPaperListComponent {
  pdfPreviewUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  data = [
    { title: 'วิจัย A', researcher: 'ดร.สมชาย', year: 2023 },
    { title: 'วิจัย B', researcher: 'อ.สมศรี', year: 2024 }
  ];

  generatePdfPreview(): void {
  registerSarabunFont(); 

  const doc = new jsPDF({ orientation: 'portrait', format: 'a4' });
  doc.setFont("Sarabun"); 

  autoTable(doc, {
    head: [['ชื่อเรื่อง', 'ผู้วิจัย', 'ปี']],
    body: this.data.map(d => [d.title, d.researcher, d.year.toString()]),
    styles: {
      font: "Sarabun", 
      fontSize: 12
    }
  });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


  downloadPdf(): void {
  registerSarabunFont(); // ✅ เพิ่มก่อนสร้าง PDF

  const doc = new jsPDF({ orientation: 'portrait', format: 'a4' });
  doc.setFont("Sarabun"); // ✅ ใช้ฟอนต์ Sarabun

  autoTable(doc, {
    head: [['ชื่อเรื่อง', 'ผู้วิจัย', 'ปี']],
    body: this.data.map(d => [d.title, d.researcher, d.year.toString()]),
    styles: {
      font: "Sarabun", // ✅ ใช้กับตาราง
      fontSize: 12
    }
  });

  doc.save('research.pdf');
}

}
