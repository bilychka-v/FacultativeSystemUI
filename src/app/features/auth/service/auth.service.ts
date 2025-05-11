import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponseModel } from '../models/login-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.roles.includes(role) ?? false;
  }

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${environment.apiBaseUrl}/Auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: UserModel): void {
    this.$user.next(user);
    sessionStorage.setItem('user-id', user.id);
    sessionStorage.setItem('user-email', user.email);
    sessionStorage.setItem('user-roles', user.roles.join(', '));
  }

  user(): Observable<UserModel | undefined> {
    return this.$user.asObservable();
  }

  getUser(): UserModel | undefined {
    const id = sessionStorage.getItem('user-id');
    const email = sessionStorage.getItem('user-email');
    const roles = sessionStorage.getItem('user-roles');

    if (id && email && roles) {
      const user: UserModel = {
        id,
        email,
        roles: roles.split(', ')
      };
      return user;
    }

    return undefined;
  }


  register(model: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/Auth/register`, model);
  }

  loginWithGoogle(credential: string) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(`${environment.apiBaseUrl}/Auth/loginWithGoogle`, { credential },
      { headers });
  }

  setAccessToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  logout(): void {
    sessionStorage.clear();
    // localStorage.clear();

    this.cookieService.delete('Authorization', '/');
    this.cookieService.deleteAll();

    this.$user.next(undefined);
  }

}
