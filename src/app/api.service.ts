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

  updateUser(userData: any) {
    return this.http.put<outputInsertUser>('http://localhost/rms-api/userdata_update.php', userData);
  }
  deleteUser(researcher_id:any){
    return this.http.post<outputDeleteUser>('http://localhost/rms-api/userdata_delete.php',researcher_id)
   }
  
}

export interface Researcher {
  researcher_id: number;
  name: string;
  name_department_eng: string;
  name_department_thai: string;
  role_name: string;
  remark: string;
}

export interface outputInsertUser {
  alert: string;
}

export interface outputDeleteUser{
  alert:string
}
