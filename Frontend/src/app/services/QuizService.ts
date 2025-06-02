import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:5000/api/quizzes'; // تأكد من رابط السيرفر الصحيح

  constructor(private http: HttpClient) {}

  createQuiz(quizData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, quizData, { headers });
  }

  getAllQuizzes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteQuiz(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


  updateQuiz(id: string, quizData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/${id}`, quizData, { headers });
  }

  getQuizById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
