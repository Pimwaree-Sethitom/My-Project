import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicPaperService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost/rms-api'; 

SelectPaperData(): Observable<any> {
      return this.http.get<PaperDetail[]>(`${this.apiUrl}/public_papers.php`);
      }

getPaperById(id: string): Observable<PaperDetail[]> {
  return this.http.get<PaperDetail[]>(`${this.apiUrl}/public_papers.php?id=${id}`);
}

}

export interface PaperDetail {
  public_paper_id: number;
  title_thai: string;
  title_english: string;
  research_type: string;
  journal_or_conference_name: string;
  publication_year: string;
  ISSN_or_ISBN: string;
  quartile_rank: string;
  authors_with_role_and_proportion: string;
  start_date:Date;
  link:string;
}
