import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

    SelectPaperData() {
      return this.http.get<PaperDetail[]>('http://localhost/rms-api/paper_select.php');
    }

    insertPaperData(paperData: any) {
        return this.http.post<outputInsertPaper>('http://localhost/rms-api/paper_insert.php', paperData);
      }

    SelectUserData() {
        return this.http.get<Researcher[]>('http://localhost/rms-api/userdata_select.php');
      }

      SelectWorkload() {
        return this.http.get<Workload[]>('http://localhost/rms-api/workload_select.php');
      }

    DeletePaper(paper_researcher_id:any){
        return this.http.post<outputDeletePaper>('http://localhost/rms-api/paper_delete.php',paper_researcher_id)
       }

    UpdatePaper(paperData: any) {
        return this.http.put<outputInsertPaper>('http://localhost/rms-api/paper_update.php', paperData);
      }
}

export interface PaperDetail {
  paper_researcher_id : number;
  title_thai: string;
  title_english: string;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  type_id: number;
  type_name: string;
  level: string;
  journal_or_conference_name: string;
  publication_year: string;
  issue_number: string;
  start_date: Date;
  end_date: Date;
  ISSN_or_ISBN: string;
  page_range: string;
  quartile_id: number;
  quartile_rank: string;
  academic_quality: string;
  Remark: string;
  detail: string;
  link: string;
  author_role: string;
  workload_year_id: number;
  workload_topic: string;
  workload_count: number;
  proportion: number;
  number_of_workloads: number;
  fiscal_year: string;
  thai_calender_year: string;
  academic_year: string;
}

export interface outputInsertPaper {
  alert: string;
}

export interface Researcher {
  researcher_id: number;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  role_name: string;
}

export interface  Workload{
  workload_year_id: number;
  workload_topic: string;
  workload_count: number;
  workload_year: string;
}

export interface outputDeletePaper{
  alert:string
}
