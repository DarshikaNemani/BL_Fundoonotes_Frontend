import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SignupRequest, LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  
  constructor(private http: HttpClient) {}

  signup(user: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/userSignUp`, user);
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
