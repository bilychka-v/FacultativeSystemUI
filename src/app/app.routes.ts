import { Routes } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component'
import {CourseListComponent} from './features/course/course-list/course-list.component';
import {AddCourseComponent} from './features/course/add-course/add-course.component';
import {EditCourseComponent} from './features/course/edit-course/edit-course.component';
import {TeacherListComponent} from './features/teacher/teacher-list/teacher-list.component';
import {TeacherAddComponent} from './features/teacher/teacher-add/teacher-add.component';
export const routes: Routes = [
  {path: 'navbar-component', component: NavbarComponent},
  {path: 'admin/course', component: CourseListComponent},
  {path: 'admin/course/add', component: AddCourseComponent},
  {path: 'admin/course/:id', component: EditCourseComponent},
  {path: 'admin/teacher', component: TeacherListComponent},
  {path: 'admin/teacher/add', component: TeacherAddComponent}
];
