import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CourseRequest} from '../models/course-request.model';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';
import {Teachers} from '../../teacher/models/teacher.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{

  model: CourseRequest;
  teachers : Teachers[] = [];
  serverErrors: { [key: string]: string } = {};




  constructor(private courseService: CourseService,
              private router: Router) {
    this.model = {
      name: '',
      startDate: '',
      endDate: '',
      teacherId: ''
    };

  }
  onFormSubmit(){
    console.log('Sending model:', this.model);
    this.serverErrors = {};
    this.courseService.addCourse(this.model)
      .subscribe({
        next: (response)=> {
          this.router.navigateByUrl('/admin/course')
        },
        error: err => {
          console.log('Error from server:', err);
          if (err.status === 400 && err.error?.errors) {
            for (let field in err.error.errors) {
              // Перетворимо 'StartDate' -> 'startDate' для зв'язку з моделлю
              const key = field.charAt(0).toLowerCase() + field.slice(1);
              this.serverErrors[key] = err.error.errors[field][0]; // беремо перше повідомлення
            }
          }
        }
      });
  }

  ngOnInit(): void {
    this.courseService.loadTeachers().subscribe({
      next: (response)=>{
        this.teachers = response;
      }
    })
  }
}
