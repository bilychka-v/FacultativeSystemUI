import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../course/services/course.service';
import {Observable} from 'rxjs';
import {Courses} from '../../course/models/course.model';
import {ListCourses} from '../../course/models/list-courses.model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  courses$? : Observable<ListCourses[]>;
  selectedSortLabel: string = '';


  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void{
    this.route.queryParams.subscribe(params =>{
      const query = params['query'] || '';
      const sortBy = params['sortBy'] || '';
      const sortDirection = params['sortDirection'] || '';
      this.courses$ = this.courseService.getCourses(query, sortBy, sortDirection);
    })
  }

  onSearch(query: string) {
    this.router.navigate([], {
      queryParams: { query },
      queryParamsHandling: 'merge'
    });
  }

  sort(sortBy: string, sortDirection: string) {
    this.router.navigate([], {
      queryParams: { sortBy, sortDirection },
      queryParamsHandling: 'merge',

    });
    this.selectedSortLabel = this.getSortable(sortBy, sortDirection);
  }

  getSortable(field: string, sortDirection: string){
    if(field === 'name' && sortDirection === 'asc') return 'Name (A-Z)';
    if(field === 'name' && sortDirection === 'desc') return 'Name (Z-A)';
    if(field === 'date' && sortDirection === 'desc') return 'New';
    if(field === 'date' && sortDirection === 'asc') return 'Old';
    return '';
  }



}
