import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Teachers} from '../models/teacher.model';
import {TeacherRequestModel} from '../models/teacher-request.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teachers[]>{
    return this.http.get<Teachers[]>(`${environment.apiBaseUrl}/api/Teacher`)
  }

  addTeacher(model: TeacherRequestModel): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/Auth/register/teacher`, model)
  }
}
