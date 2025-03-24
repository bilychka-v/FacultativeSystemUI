import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CourseService} from '../services/course.service';
import {Courses} from '../models/course.model';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CourseRequest} from '../models/course-request.model';
import {Teachers} from '../../teacher/models/teacher.model';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  templateUrl: './edit-course.component.html',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription? : Subscription;
  editSubscription?: Subscription;
  course?: Courses;
  teachers : Teachers[] = []
  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {
  }
  ngOnInit(): void {
    this.courseService.loadTeachers().subscribe({
      next: (response)=>{ this.teachers = response }
    });
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) =>
      {
        this.id = params.get('id');

        if(this.id){
          this.courseService.getCourseById(this.id)
            .subscribe({
              next: (response)=> {
                this.course = response;
              }
            });
        }
      }
    });
  }


  onFormSubmit(): void{
    const updateCourseRequest: CourseRequest = {
      name: this.course?.name ?? '',
      startDate: this.course?.startDate ?? '',
      endDate: this.course?.endDate ?? '',
      teacherId: this.course?.teacherId ?? ''

    };
    if(this.id) {
      this.editSubscription = this.courseService.updateCourse(this.id, updateCourseRequest)
        .subscribe({
          next: (response)=>{
            this.router.navigateByUrl('/admin/course');
          }
        })
    }
  }

  onDelete(): void{
    if(this.id) {
      this.courseService.deleteCourse(this.id)
        .subscribe({
          next: (response)=>{
            this.router.navigateByUrl('admin/course');
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editSubscription?.unsubscribe();
  }
}
