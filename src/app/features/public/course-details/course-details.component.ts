import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CourseService} from '../../course/services/course.service';
import {Courses} from '../../course/models/course.model';
import {Subscription} from 'rxjs';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Teachers} from '../../teacher/models/teacher.model';
import {TeacherService} from '../../teacher/services/teacher.service';
import {AuthService} from '../../auth/service/auth.service';
import {StudentService} from '../../student/services/student.service';
import {StudentJoinCourse} from '../../student/models/student-join-course';

@Component({
  selector: 'app-course-details',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    RouterLink
  ],
  standalone: true,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  id: string | null = null;
  studentId: string | undefined;
  paramsSubscriptionId?: Subscription;
  course?: Courses;
  teacher?: Teachers;
  constructor
  (
    private route: ActivatedRoute,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private studentService: StudentService
  ) {

  }
  ngOnInit(): void {

    this.paramsSubscriptionId = this.route.paramMap
      .subscribe({

        next: (params) =>{
          this.id = params.get('id')

          if(this.id){
            this.courseService.getCourseById(this.id)
              .subscribe({
                next: (response)=> {
                  this.course = response;

                  if (this.course.teacherId) {
                    this.teacherService.getTeacherById(this.course.teacherId)
                      .subscribe({
                        next: (teacher) => {
                          this.teacher = teacher;
                        }
                      });
                  }
                }
              });
          }
        }
      });
  }

  onJoin(): void {
    if (!this.id) {
      alert('ID курсу не знайдено.');
      return;
    }

    const currentUser = this.authService.getUser();
    if (!currentUser?.id) {
      alert('Користувач не авторизований!');
      return;
    }

    this.studentId = currentUser.id;

    const joinRequest: StudentJoinCourse = {
      courseId: this.id
    };

    console.log('Запит на приєднання:', joinRequest);  // Додано лог для перевірки запиту

    this.studentService.joinStudent(this.studentId, joinRequest)
      .subscribe({
        next: () => {
          alert('Успішно приєднано до курсу!');
        },
        error: (error) => {
          console.error('Помилка при приєднанні:', error);  // Покращено логування помилки
          alert('Сталася помилка при приєднанні до курсу.');
        }
      });
  }




  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  ngOnDestroy(): void {
    this.paramsSubscriptionId?.unsubscribe();
  }


}
