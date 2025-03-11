import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  SelectUserData() {
    return this.http.get<Researcher[]>('http://localhost/rms-api/userdata_select.php');
  }

  insertUser(userData: any) {
    return this.http.post<outputInsertUser>('http://localhost/rms-api/userdata_insert.php', userData);
  }
}

export interface Researcher {
  researcher_id: number;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  role_name: string;
}

export interface outputInsertUser {
  alert: string;
}
