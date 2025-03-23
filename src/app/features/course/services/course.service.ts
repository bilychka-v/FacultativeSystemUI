import { Injectable } from '@angular/core';
import {CourseRequest} from '../models/course-request.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Courses} from '../models/course.model';
import {environment} from '../../../../environments/environment';
import {ListCourses} from '../models/list-courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(model: CourseRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Course`, model);
  }

  getCourses(): Observable<ListCourses[]>{
    return this.http.get<ListCourses[]>(`${environment.apiBaseUrl}/api/Course`)
  }

  getCourseById(id: string): Observable<Courses>{
    return this.http.get<Courses>(`${environment.apiBaseUrl}/api/Course/${id}`)
  }

  updateCourse(id: string, updateCourse: CourseRequest): Observable<Courses>{
    return this.http.put<Courses>(`${environment.apiBaseUrl}/api/Course/${id}`, updateCourse)
  }
}
