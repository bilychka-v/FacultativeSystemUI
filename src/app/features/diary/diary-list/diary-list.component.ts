import {Component, OnInit} from '@angular/core';
import {DiaryService} from '../service/diary.service';
import {GradesList} from '../models/grades-list';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-diary-list',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.css'
})
export class DiaryListComponent implements OnInit{

  id: string | null = null;
  grades : GradesList[] = [];
  paramsSubscriptionGrades? : Subscription;

  constructor(private diaryService: DiaryService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.paramsSubscriptionGrades = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.id = params.get('id');

          if (this.id) {

            this.diaryService.getGradesByStudentId(this.id)
              .subscribe({
                next: (response) => {
                  this.grades = response;
                }
              });
          }
        }
      });
    }
  }
