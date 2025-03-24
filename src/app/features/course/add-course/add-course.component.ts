import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CourseRequest} from '../models/course-request.model';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';
import {Teachers} from '../../teacher/models/teacher.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{

  model: CourseRequest;
  teachers : Teachers[] = []



  constructor(private courseService: CourseService,
              private router: Router) {
    this.model = {
      name: '',
      startDate: '',
      endDate: '',
      teacherId: ''
    };

  }
  onFromSubmit(){
    this.courseService.addCourse(this.model)
      .subscribe({
        next: (response)=> {
          this.router.navigateByUrl('/admin/course')
        }
      })
  }

  ngOnInit(): void {
    this.courseService.loadTeachers().subscribe({
      next: (response)=>{
        this.teachers = response;
      }
    })
  }
}
