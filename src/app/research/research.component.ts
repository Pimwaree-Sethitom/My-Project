import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchBarComponent } from '../research-bar/research-bar.component';
import { RouterModule } from '@angular/router';
import { ResearchService , PaperDetail } from '../services/research.service';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-research',
  standalone: true, 
  imports: [ CommonModule, 
             ResearchBarComponent, 
             RouterModule, 
             FormsModule,
             MatFormFieldModule,
             MatInputModule,
             MatIconModule,
             MatButtonModule
          ], 
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
  providers: [ResearchService]
})
export class ResearchComponent implements OnInit{
        paperdetail: PaperDetail[] = [];
        searchText: string = ''; 
        searchField: keyof PaperDetail = 'title_thai';
        filteredPaperdetail: PaperDetail[] = []; 

        private researchService = inject(ResearchService);

        ngOnInit(): void { 
          this.SelectPaper();
        }

        SelectPaper() { 
            this.researchService.SelectPaperData().subscribe((data: PaperDetail[]) => {
              this.paperdetail = data;
              this.filteredPaperdetail = data; 
            });
          }

          SearchPaper() {
            const searchTextNormalized = this.searchText
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
          
            this.filteredPaperdetail = this.paperdetail.filter((paperdetail) => {
              const fieldValue = String(paperdetail[this.searchField])
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
          
              // แยกคำโดยใช้เว้นวรรคและสัญลักษณ์ที่ใช้แบ่งคำ
              const words = fieldValue.split(/[\s\-\/]+/);
          
              // ตรวจสอบว่ามีคำที่ขึ้นต้นด้วย searchText หรือไม่
              return words.some(word => word.startsWith(searchTextNormalized));
            });
          }                   
          
          ShowPaperDate(paper: PaperDetail) {
            console.log(paper); // ดูว่า paper ถูกส่งมาหรือไม่
          
            Swal.fire({
              title: "📜 รายละเอียดงานวิจัย",
              html: `
                <div style="text-align: left; font-family: Arial, sans-serif; line-height: 1.6;">
                  <div style="margin-bottom: 10px;">
                    <b>📌 ชื่อเรื่องไทย :</b> ${paper.title_thai || 'ไม่มีข้อมูล'}<br>
                    <b>📌 ชื่อเรื่องอังกฤษ :</b> ${paper.title_english || 'ไม่มีข้อมูล'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>👤 ผู้แต่ง :</b> ${paper.name || 'ไม่ระบุ'}<br>
                    <b>📝 บทบาทของผู้แต่ง :</b> ${paper.author_role || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>📚 ประเภทงานวิจัย :</b> ${paper.type_name || 'ไม่ระบุ'}<br>
                    <b>🏫 ระดับงานวิจัย :</b> ${paper.level || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>📖 ชื่อวารสาร/การประชุม :</b> ${paper.journal_or_conference_name || 'ไม่ระบุ'}<br>
                    <b>📅 ปีที่เผยแพร่ :</b> ${paper.publication_year || 'ไม่ระบุ'}<br>
                    <b>🔢 เลขที่ฉบับ :</b> ${paper.issue_number || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>📅 วันที่เริ่มต้น:</b> ${paper.start_date || 'ไม่ระบุ'}<br>
                    <b>📅 วันที่สิ้นสุด:</b> ${paper.end_date || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">   
                    <b>📑 ISSN/ISBN:</b> ${paper.ISSN_or_ISBN || 'ไม่ระบุ'}<br>
                    <b>📄 ช่วงหน้าที่เผยแพร่:</b> ${paper.page_range || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;"> 
                    <b>🏅 Quartile Rank:</b> ${paper.quartile_rank || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>🎓 คุณภาพทางวิชาการ:</b> ${paper.academic_quality || 'ไม่ระบุ'}<br>
                    <b>💬 หมายเหตุ:</b> ${paper.Remark || 'ไม่มีข้อมูล'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>🔗 ลิงก์:</b> <a href="${paper.link || '#'}" target="_blank">${paper.link || 'ไม่มีลิงก์'}</a><br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>🔍 หัวข้อภาระงาน:</b> ${paper.workload_topic || 'ไม่ระบุ'}<br>
                    <b>🧑‍💻 จำนวนภาระงาน:</b> ${paper.workload_count || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>📊 สัดส่วนงาน:</b> ${paper.proportion || 'ไม่ระบุ'}<br>
                    <b>📅 จำนวนภาระงานทั้งหมด:</b> ${paper.number_of_workloads || 'ไม่ระบุ'}<br>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <b>💰 ปีงบประมาณ:</b> ${paper.fiscal_year || 'ไม่ระบุ'}<br>
                    <b>📅 ปี พ.ศ.:</b> ${paper.thai_calender_year || 'ไม่ระบุ'}<br>
                    <b>📚 ปีการศึกษา:</b> ${paper.academic_year || 'ไม่ระบุ'}<br>
                  </div>
                </div>
              `,
              showCloseButton: true,
              confirmButtonText: "ปิด",
              customClass: {
                popup: 'custom-swal-popup'
              },
              width: '60%'
            });
        }

          DeletePaper(paper_researcher_id: any) {
            const body = { paper_researcher_id: paper_researcher_id };
            this.researchService.DeletePaper(body).subscribe(result => {
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
                this.SelectPaper();
            });
        }
        
          
                 
}


