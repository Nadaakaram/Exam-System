import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = 'http://localhost:5000/api/auth';
private apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getCurrentUser() {
    
    const userData = localStorage.getItem('currentUser');
    if (userData) return JSON.parse(userData);

    return this.http.get(`${this.apiUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }
}
