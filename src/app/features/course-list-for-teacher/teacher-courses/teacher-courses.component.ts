import {Component, OnInit} from '@angular/core';
import {TeacherCourseService} from '../service/teacher-course.service';
import {TeacherCourseModel} from '../models/teacher-course.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-teacher-courses',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    RouterLink,
    NgSwitch,
    NgSwitchCase
  ],
  standalone: true,
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent implements OnInit{

  id: string | null = null;
  courses: TeacherCourseModel[] | undefined = [];
  paramsSubscriptionCourses? : Subscription;
  constructor(private teacherService: TeacherCourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscriptionCourses = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.id = params.get('id');

          if(this.id){
            this.teacherService.getCoursesByTeacherId(this.id)
              .subscribe({
                next: (response)=>{
                  this.courses = response
                }
              });
            }
          }
        });
  }

  getCourseStatus(startDate: string | Date, endDate: string | Date): 'not-started' | 'active' | 'finished' {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'not-started';
    if (now > end) return 'finished';
    return 'active';
  }



}
