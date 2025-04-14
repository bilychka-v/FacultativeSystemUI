import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RegisterRequest} from '../models/register-request';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  model: RegisterRequest;

  constructor(private registerService: AuthService, private router: Router) {
    this.model = {
      userName: '',
      email: '',
      password: ''
    }
  }

  submitForm(): void {

    this.registerService.register(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/login')
    }
      })
  }
}
