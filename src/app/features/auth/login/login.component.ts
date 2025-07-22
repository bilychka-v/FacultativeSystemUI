import { Component, NgZone, OnInit } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../../environments/environment';
import {CredentialResponse} from '../models/credential.response.model';
import {NgIf} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  model: LoginRequestModel;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private _ngZone: NgZone
  ) {
    this.model = {
      email: '',
      password: ''
    };
  }

  submitForm(): void {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          this.authService.setAccessToken(response.token);

          this.authService.setUser({
            id: response.id,
            email: response.email,
            roles: response.roles
          });

          this.router.navigateByUrl('/');
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = error.error.message || 'Invalid login or password';
          }
        }
      });
  }

    getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('Authorization'); // Get token from cookies
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
    return new HttpHeaders();
  }

  loadGoogleScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.head.appendChild(script);
  }
  initializeGoogleSignIn(): void {
    (window as any).google.accounts.id.initialize({
      client_id: environment.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: true
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', width: '300' }
    );

    (window as any).google.accounts.id.prompt();
  }


  ngOnInit(): void {
    this.loadGoogleScript();
  }


  handleCredentialResponse(response: CredentialResponse): void {
    this.authService.loginWithGoogle(response.credential)
      .subscribe({
        next: (x: any) => {
          // Save token in cookies
          this.cookieService.set('Authorization', `Bearer ${x.token}`);

          // Set the token for future requests
          this.authService.setAccessToken(x.token);

          // Set user data
          this.authService.setUser({
            id: x.id,
            email: x.email,
            roles: x.roles
          });

          this._ngZone.run(() => {
            // Redirect to home page
            this.router.navigateByUrl('/');
          });
        },
        error: (error: any) => {
          console.error('Google login error:', error);
        }
      });
  }

}
