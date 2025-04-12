import {Component, OnInit} from '@angular/core';
import {TeacherCourseService} from '../service/teacher-course.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {GradesList} from '../../diary/models/grades-list';
import {GradeUpdate} from '../models/grade-update';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-grades-update',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './grades-update.component.html',
  styleUrl: './grades-update.component.css'
})
export class GradesUpdateComponent implements OnInit{

  feedbackId: string | null = null;
  paramsSubscriptionGrades? : Subscription;
  editSubscriptionGrades?: Subscription;
  feedback?: GradesList;

  constructor(private feedbackService: TeacherCourseService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }
  ngOnInit(): void {


    this.paramsSubscriptionGrades = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.feedbackId = params.get('feedbackId');

          if(this.feedbackId){
            this.feedbackService.getGradesByFeedbackId(this.feedbackId)
              .subscribe({
                next: (response)=>{
                  this.feedback = response;
                }
              })
          }

      }
  })

}

  onFormSubmit(): void {
    const updateGradeRequest: GradeUpdate = {
      grade: this.feedback?.grade ?? '',
      feedback: this.feedback?.feedback ?? ''
    };
    if (this.feedbackId) {
      this.editSubscriptionGrades = this.feedbackService.editGradesByFeedbackId(this.feedbackId, updateGradeRequest)
        .subscribe({
          next: (response) => {
            this.location.back();

          }
        })
    }
  }
}
