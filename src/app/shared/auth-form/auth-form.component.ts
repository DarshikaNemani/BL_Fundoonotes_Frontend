import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  authForm: FormGroup;
  isLoginMode = true;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.createForm();
  }

  createForm(): FormGroup {
    if (this.isLoginMode) {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    } else {
      return this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNumber: ['', Validators.required]
      });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.createForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if (this.isLoginMode) {
        this.login();
      } else {
        this.signup();
      }
    }
  }

  login(): void {
    const loginData = {
      ...this.authForm.value,
      service: 'advance'
    };
    
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.setToken(response.id);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  signup(): void {
    const signupData = {
      ...this.authForm.value,
      service: 'advance',
      role: 'user'
    };
    
    this.authService.signup(signupData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        alert('Signup successful! Please login.');
        this.toggleMode();
      },
      error: (error) => {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    });
  }
}
