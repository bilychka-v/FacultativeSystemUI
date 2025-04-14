import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../features/auth/service/auth.service';
import {UserModel} from '../../../features/auth/models/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user?: UserModel;

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response)=>{
         this.user = response;
        }
      });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }


}
