import { Component } from '@angular/core';
import {LoginRequestModel} from '../models/login-request.model';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequestModel;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  submitForm(): void{
    this.authService.login(this.model)
      .subscribe({
        next: (response) =>{

          //set auth cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');

          // set user
          this.authService.setUser({
            id: response.id,
            email: response.email,
            roles: response.roles

          });

          //redirect back to
          this.router.navigateByUrl('/')
        }
      })


  }
}
