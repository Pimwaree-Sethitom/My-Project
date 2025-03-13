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
}

export interface PaperDetail {
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
  start_date: string;
  end_date: string;
  ISSN_or_ISBN: string;
  page_range: string;
  quartile_rank: string;
  academic_quality: string;
  Remark: string;
  detail: string;
  link: string;
  author_role: string;
  workload_topic: string;
  workload_count: number;
  proportion: number;
  number_of_workloads: number;
  fiscal_year: string;
  thai_calendar_year: string;
  academic_year: string;
}
