import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherCourseModel} from '../models/teacher-course.model';
import {environment} from '../../../../environments/environment';
import {StudentGrades} from '../models/student-grades';
import {GradeUpdate} from '../models/grade-update';
import {GradesList} from '../../diary/models/grades-list';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  constructor(private http: HttpClient) { }

  getCoursesByTeacherId(id: string): Observable<TeacherCourseModel[]>{
    return this.http.get<TeacherCourseModel[]>(`${environment.apiBaseUrl}/api/Teacher/${id}/courses`)
  }

  getGradesByCourseId(courseId: string): Observable<StudentGrades[]>{
    return this.http.get<StudentGrades[]>(`${environment.apiBaseUrl}/api/Course/${courseId}/grades`)
  }

  getGradesByFeedbackId(feedbackId: string): Observable<GradesList>{
    return this.http.get<GradesList>(`${environment.apiBaseUrl}/api/Course/${feedbackId}/feedback`)
  }
  editGradesByFeedbackId(feedbackId: string, updateGrade: GradeUpdate): Observable<StudentGrades>{
    return this.http.put<StudentGrades>(`${environment.apiBaseUrl}/api/Course/${feedbackId}/grades`, updateGrade)
  }
}
