import { Injectable } from '@angular/core';
import {AddCourseRequest} from '../models/add-course-request.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Courses} from '../models/course.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(model: AddCourseRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/course`, model);
  }

  getCourses(): Observable<Courses[]>{
    return this.http.get<Courses[]>(`${environment.apiBaseUrl}/api/Course`)
  }
}
