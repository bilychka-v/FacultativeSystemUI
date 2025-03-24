import {Component, OnInit} from '@angular/core';
import {Teachers} from '../models/teacher.model';
import {TeacherService} from '../services/teacher.service';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  templateUrl: './teacher-list.component.html',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit{
  teachers?: Teachers[]
  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers()
      .subscribe({
        next: (response)=>{
          this.teachers = response;
        }
      })
  }
}
