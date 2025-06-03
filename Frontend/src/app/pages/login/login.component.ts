import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder , private authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log("loginForm value", email, password);
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          console.log('Login successful!', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          // this.router.navigate(['/student-dashboard']);

          if(res.user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          }else {
            this.router.navigate(['/student-dashboard']);
          }
        },
        error: (err: any) => {
          console.error('Login failed.', err);
          console.log(err.error.message );
        }
      })
      console.log('Login Form Submitted!', this.loginForm.value);
    } else {
      console.log('Login Form is invalid. Please correct errors.');
      this.loginForm.markAllAsTouched();
    }
  }
}


