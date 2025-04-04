import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CourseService} from '../../course/services/course.service';
import {Courses} from '../../course/models/course.model';
import {Subscription} from 'rxjs';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Teachers} from '../../teacher/models/teacher.model';
import {TeacherService} from '../../teacher/services/teacher.service';
import {AuthService} from '../../auth/service/auth.service';

@Component({
  selector: 'app-course-details',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    RouterLink
  ],
  standalone: true,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  id: string | null = null;
  paramsSubscriptionId?: Subscription;
  course?: Courses;
  teacher?: Teachers;
  constructor
  (
    private route: ActivatedRoute,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {

    this.paramsSubscriptionId = this.route.paramMap
      .subscribe({

        next: (params) =>{
          this.id = params.get('id')

          if(this.id){
            this.courseService.getCourseById(this.id)
              .subscribe({
                next: (response)=> {
                  this.course = response;

                  if (this.course.teacherId) {
                    this.teacherService.getTeacherById(this.course.teacherId)
                      .subscribe({
                        next: (teacher) => {
                          this.teacher = teacher;
                        }
                      });
                  }
                }
              });
          }
        }
      });
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  ngOnDestroy(): void {
    this.paramsSubscriptionId?.unsubscribe();
  }


}
