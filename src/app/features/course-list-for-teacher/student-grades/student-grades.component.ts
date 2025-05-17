import {Component, OnInit} from '@angular/core';
import {TeacherCourseService} from '../service/teacher-course.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {StudentGrades} from '../models/student-grades';
import {NgForOf, NgIf} from '@angular/common';
import { Location } from '@angular/common';

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


  constructor(private teacherService: TeacherCourseService, private route: ActivatedRoute, private router: Router,  private location: Location) {
  }

  ngOnInit(): void {
    this.paramsSubscriptionStudents = this.route.paramMap.subscribe({
      next: (params) => {
        this.courseId = params.get('courseId');

        if (this.courseId) {
          this.route.queryParams.subscribe({
            next: (queryParams) => {
              const sortByGrade = queryParams['sortByGrade'] || '';
              const sortDirection = queryParams['sortDirection'] || '';

              this.teacherService.getGradesByCourseId(this.courseId!, sortByGrade, sortDirection)
                .subscribe({
                  next: (response) => {
                    this.studentGrades = response;
                  },
                  error: (error) => {
                    console.error('Error loading grades:', error);
                  }
                });
            }
          });
        }
      },
      error: (err) => {
        console.error('Error in paramMap:', err);
      }
    });
  }


  sortByGrades(sortByGrade: string, sortDirection: string){
    this.router.navigate([],{
      queryParams: {sortByGrade, sortDirection},
        queryParamsHandling: 'merge',
      }
      )
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.paramsSubscriptionStudents) {
      this.paramsSubscriptionStudents.unsubscribe();
    }
  }


}
