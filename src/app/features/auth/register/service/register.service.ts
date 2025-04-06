import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterRequest} from '../models/register-request';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  register(model: RegisterRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/Auth/register`, model)
  }
}
