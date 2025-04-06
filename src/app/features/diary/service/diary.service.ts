import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GradesList} from '../models/grades-list';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) { }

  getGradesByStudentId(id: string): Observable<GradesList[]>{
    return this.http.get<GradesList[]>(`${environment.apiBaseUrl}/api/Student/${id}/grades`)
  }
}
