import {Component} from '@angular/core';
import {TeacherRequestModel} from '../models/teacher-request.model';
import {FormsModule} from '@angular/forms';
import {TeacherService} from '../services/teacher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-add',
  standalone: true,
  templateUrl: './teacher-add.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './teacher-add.component.css'
})
export class TeacherAddComponent{

  model: TeacherRequestModel

  constructor(private teacherService: TeacherService, private router: Router) {
    this.model = {
      userName: '',
      email: '',
      password: ''
    }
  }

  onSubmit(){
    this.teacherService.addTeacher(this.model)
      .subscribe({
        next: (response)=> {
          this.router.navigateByUrl('/admin/teacher')
        }
      })
  }

}
