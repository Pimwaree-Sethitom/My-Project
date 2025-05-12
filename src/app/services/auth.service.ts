import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/rms-api';

  constructor(private http: HttpClient) { }

  SelectUserData() : Observable<any> {
          return this.http.get<Researcher[]>(`${this.apiUrl}/userdata_select.php`);
        }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }
}

export interface Researcher {
  researcher_id: number;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  role_name: string;
}
