import {Component, OnInit} from '@angular/core';
import {StudentListResponseModel} from '../models/student-list-response.model';
import {StudentService} from '../services/student.service';
import {Observable} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  students?: StudentListResponseModel[]
  constructor(private studentService: StudentService) {
  }


  ngOnInit(): void {
    this.studentService.getStudents()
      .subscribe({
        next: (response)=>{
          this.students = response
        }
      });
  }

}
