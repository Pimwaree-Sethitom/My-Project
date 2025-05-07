import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }
      
      //Table Public_Paper and Table Paper_Researcher
      SelectPaperData() {
      return this.http.get<PaperDetail[]>('http://localhost/rms-api/paper_select.php');
      }

      insertPaperData(paperData: any) {
        return this.http.post<outputInsertPaper>('http://localhost/rms-api/paper_insert.php', paperData);
      }

      DeletePaper(paper_researcher_id:any){
        return this.http.post<outputDeletePaper>('http://localhost/rms-api/paper_delete.php',paper_researcher_id)
       }

      UpdatePaper(paperData: any) {
        return this.http.put<outputInsertPaper>('http://localhost/rms-api/paper_update.php', paperData);
      }

      //Table Researcher
      SelectUserData() {
        return this.http.get<Researcher[]>('http://localhost/rms-api/userdata_select.php');
      }

      //Table Workload_Year
      SelectWorkload() {
        return this.http.get<Workload[]>('http://localhost/rms-api/workload_select.php');
      }

      InsertWorkload(WorkloadData: any) {
        return this.http.post<outputInsertWorkload>('http://localhost/rms-api/workload_insert.php', WorkloadData);
      }
  
      UpdateWorkload(WorkloadData: any) {
        return this.http.post<outputInsertWorkload>('http://localhost/rms-api/workload_update.php', WorkloadData);
      }

      DeleteWorkload(workload_year_id:any){
        return this.http.post<outputDeleteWorkload>('http://localhost/rms-api/workload_delete.php',workload_year_id)
       }

       //Table Research_Type
       InsertResearchType(ResearchTypeData: any) {
        return this.http.post<outputInsertResearchType>('http://localhost/rms-api/research_type_insert.php', ResearchTypeData);
      }

      DeleteResearchType(type_id:any){
        return this.http.post<outputDeleteResearchType>('http://localhost/rms-api/research_type_delete.php',type_id)
       }

      SelectResearchType() {
        return this.http.get<ResearchType[]>('http://localhost/rms-api/research_type_select.php');
      }

      UpdateResearchType(ResearchTypeData: any) {
        return this.http.post<outputInsertResearchType>('http://localhost/rms-api/research_type_update.php', ResearchTypeData);
      }

      //Table Quartile
      SelectQuartile() {
        return this.http.get<Quartile[]>('http://localhost/rms-api/quartile_select.php');
      }

      DeleteQuartile(quartile_id:any){
        return this.http.post<outputDeleteQuartile>('http://localhost/rms-api/quartile_delete.php',quartile_id)
       }

      InsertQuartile(QuartileTypeData: any) {
        return this.http.post<outputInsertQuartile>('http://localhost/rms-api/quartile_insert.php', QuartileTypeData);
      }

      UpdateQuartile(QuartileData: any) {
        return this.http.post<outputInsertQuartile>('http://localhost/rms-api/quartile_update.php', QuartileData);
      }

}

//Table Public_Paper and Table Paper_Researcher
export interface PaperDetail {
  paper_researcher_id : number;
  title_thai: string;
  title_english: string;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  type_id: number;
  type_name: string;
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

export interface outputDeletePaper{
  alert:string
}

//Table Researcher
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

//Table Workload_Year
export interface outputInsertWorkload{
  alert: string;
}

export interface outputDeleteWorkload{
  alert:string
}

//Table Research_Type
export interface  ResearchType{
  type_id: number;
  type_name: string;
}

export interface outputDeleteResearchType{
  alert:string
}

export interface outputInsertResearchType{
  alert: string;
}

//Table Quartile
export interface  Quartile{
  quartile_id: number;
  quartile_rank: string;
}

export interface outputDeleteQuartile{
  alert:string
}

export interface outputInsertQuartile{
  alert: string;
}