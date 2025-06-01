import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return;
      }

      this.authService.register({ name, email, password }).subscribe({
        next: (res: any) => {
          console.log('Registration successful!', res);
          this.router.navigate(['/login']); // Navigate to login page after successful registration
        },
        error: (err: any) => {
          if (err.error.msg === 'Email already exists') {
            this.errorMessage = 'You already have an account. Please login.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
        },
      });
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
}
