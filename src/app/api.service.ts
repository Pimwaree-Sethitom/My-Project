import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/rms-api';
  // private apiUrl = 'http://10.201.30.133:9000/rms_api';

  constructor(private http: HttpClient) { }

  SelectUserData() : Observable<any>{
    return this.http.get<Researcher[]>(`${this.apiUrl}/userdata_select.php`);
  }

  insertUser(userData: any) : Observable<any>{
    return this.http.post<outputInsertUser>(`${this.apiUrl}/userdata_insert.php`, userData);
  }

  updateUser(userData: any) : Observable<any>{
    return this.http.put<outputInsertUser>(`${this.apiUrl}/userdata_update.php`, userData);
  }
  deleteUser(researcher_id:any): Observable<any>{
    return this.http.post<outputDeleteUser>(`${this.apiUrl}/userdata_delete.php`,researcher_id)
   }
  
}

export interface Researcher {
  researcher_id: number;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  role_name: string;
  remark: string;
  role_id: number;
}

export interface outputInsertUser {
  alert: string;
}

export interface outputDeleteUser{
  alert:string
}
