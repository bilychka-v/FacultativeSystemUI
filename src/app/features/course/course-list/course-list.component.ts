import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CourseService} from '../services/course.service';
import {Courses} from '../models/course.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  courses?: Courses[];
  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.getCourses()
      .subscribe({
        next: (response)=>{
          this.courses = response;
        }
      })
  }


}
