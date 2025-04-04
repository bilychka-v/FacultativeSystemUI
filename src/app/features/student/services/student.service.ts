import { Injectable } from '@angular/core';
import {StudentListResponseModel} from '../models/student-list-response.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getStudents():Observable<StudentListResponseModel[]>{
    return this.http.get<StudentListResponseModel[]>(`${environment.apiBaseUrl}/api/Student`)
  }
}
