import { Routes } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component'
import {CourseListComponent} from './features/course/course-list/course-list.component';
import {AddCourseComponent} from './features/course/add-course/add-course.component';
import {EditCourseComponent} from './features/course/edit-course/edit-course.component';
import {TeacherListComponent} from './features/teacher/teacher-list/teacher-list.component';
import {TeacherAddComponent} from './features/teacher/teacher-add/teacher-add.component';
import {LoginComponent} from './features/auth/login/login.component';
import {HomeComponent} from './features/public/home/home.component';
import {StudentListComponent} from './features/student/student-list/student-list.component';
import {CourseDetailsComponent} from './features/public/course-details/course-details.component';
import {DiaryListComponent} from './features/diary/diary-list/diary-list.component';
import {TeacherCoursesComponent} from './features/course-list-for-teacher/teacher-courses/teacher-courses.component';
import {StudentGradesComponent} from './features/course-list-for-teacher/student-grades/student-grades.component';
import {GradesUpdateComponent} from './features/course-list-for-teacher/grades-update/grades-update.component';
import {RegisterComponent} from './features/auth/register/register.component';
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbar-component', component: NavbarComponent},
  {path: 'course/:id', component: CourseDetailsComponent},
  {path: 'admin/course', component: CourseListComponent},
  {path: 'admin/course/add', component: AddCourseComponent},
  {path: 'admin/course/:id', component: EditCourseComponent},
  {path: 'admin/teacher', component: TeacherListComponent},
  {path: 'admin/teacher/add', component: TeacherAddComponent},
  {path: 'admin/student', component: StudentListComponent},
  {path: 'student/:id/grades', component: DiaryListComponent},
  {path: 'teacher/:id/courses', component: TeacherCoursesComponent},
  {path: 'course/:courseId/grades', component: StudentGradesComponent },
  {path: 'course/:feedbackId/feedback', component: GradesUpdateComponent}
];
