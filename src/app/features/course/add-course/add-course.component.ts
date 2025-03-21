import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddCourseRequest} from '../models/add-course-request.model';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  model: AddCourseRequest;

  constructor(private courseService: CourseService,
              private router: Router) {
    this.model = {
      name: '',
      startDate: '',
      endDate: ''
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
}
