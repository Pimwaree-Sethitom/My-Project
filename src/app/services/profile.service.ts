import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost/rms-api';
  // private apiUrl = 'http://10.201.30.133:9000/rms_api';

  constructor(private http: HttpClient) { }

  getResearchByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_research_by_user.php?user_id=${userId}`);
  }

}
