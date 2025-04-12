import {Component, OnInit} from '@angular/core';
import {TeacherCourseService} from '../service/teacher-course.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {StudentGrades} from '../models/student-grades';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-student-grades',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.css'
})
export class StudentGradesComponent implements OnInit{

  courseId: string | null = null;
  studentGrades: StudentGrades[] = [];
  paramsSubscriptionStudents? : Subscription;


  constructor(private teacherService: TeacherCourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.paramsSubscriptionStudents = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.courseId = params.get('courseId');

          if(this.courseId){
            this.teacherService.getGradesByCourseId(this.courseId)
              .subscribe({
                next: (response)=>{
                  this.studentGrades = response;
                }
              })
          }
      }
      })
  }

}
