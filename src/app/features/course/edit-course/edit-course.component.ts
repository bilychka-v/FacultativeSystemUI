import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CourseService} from '../services/course.service';
import {Courses} from '../models/course.model';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  templateUrl: './edit-course.component.html',
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription? : Subscription;
  course?: Courses;
  constructor(private router: ActivatedRoute, private courseService: CourseService) {
  }
  ngOnInit(): void {
    this.paramsSubscription = this.router.paramMap.subscribe({
      next: (params) =>
      {
        this.id = params.get('id');

        if(this.id){
          this.courseService.getCourseById(this.id)
            .subscribe({
              next: (response)=> {
                this.course = response;
              }
            })
        }
      }
    });
  }

  onFormSubmit(): void{
    console.log(this.course)
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
