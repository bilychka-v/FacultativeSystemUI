import { Injectable } from '@angular/core';
import {CourseRequest} from '../models/course-request.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Courses} from '../models/course.model';
import {environment} from '../../../../environments/environment';
import {ListCourses} from '../models/list-courses.model';
import {Teachers} from '../../teacher/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  constructor(private http: HttpClient) {
  }

  addCourse(model: CourseRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Course`, model);
  }

  getCourses(query?: string, sortBy?: string, sortDirection?: string): Observable<ListCourses[]> {
    let params = new HttpParams();

    if(query){
      params = params.set('courseName', query)
    }

    if(sortBy){
      params = params.set('sortBy', sortBy)
    }
    if(sortDirection){
      params = params.set('sortDirection', sortDirection)
    }

    return this.http.get<ListCourses[]>(`${environment.apiBaseUrl}/api/Course`, {
      params: params
    })
  }

  getCourseById(id: string): Observable<Courses> {
    return this.http.get<Courses>(`${environment.apiBaseUrl}/api/Course/${id}`)
  }

  updateCourse(id: string, updateCourse: CourseRequest): Observable<Courses> {
    return this.http.put<Courses>(`${environment.apiBaseUrl}/api/Course/${id}`, updateCourse)
  }

  deleteCourse(id: string): Observable<Courses> {
    return this.http.delete<Courses>(`${environment.apiBaseUrl}/api/Course/${id}`)
  }

  loadTeachers(): Observable<Teachers[]> {
    return this.http.get<Teachers[]>(`${environment.apiBaseUrl}/api/Teacher`)

  }
}
