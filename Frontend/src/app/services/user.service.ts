import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';
  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.userSource.next(user);
      })
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      tap(updatedUser => {
        this.userSource.next(updatedUser);
      })
    )
  }

    setUser(user: any) {
    this.userSource.next(user);
  }
 getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`); 
}
}
