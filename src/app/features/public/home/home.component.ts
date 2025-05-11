import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../course/services/course.service';
import {Observable} from 'rxjs';
import {Courses} from '../../course/models/course.model';
import {ListCourses} from '../../course/models/list-courses.model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  courses$? : Observable<ListCourses[]>
  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void{
    this.courses$ = this.courseService.getCourses();
  }

  onSearch(query: string){
    this.courses$ = this.courseService.getCourses(query);
  }

}
