import { Routes } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component'
import {CourseListComponent} from './features/course/course-list/course-list.component';
import {AddCourseComponent} from './features/course/add-course/add-course.component';
export const routes: Routes = [
  {path: 'navbar-component', component: NavbarComponent},
  {path: 'admin/course', component: CourseListComponent},
  {path: 'admin/course/add', component: AddCourseComponent}
];
