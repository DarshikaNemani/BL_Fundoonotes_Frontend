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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.createForm();
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
    const { email, password } = this.authForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.authService.setToken(response.id);
        this.router.navigate(['/']);
      },
      error: (error) => console.error('Login failed:', error)
    });
  }

  signup(): void {
    this.authService.signup(this.authForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.toggleMode();
      },
      error: (error) => console.error('Signup failed:', error)
    });
  }
}
