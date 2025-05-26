import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:5000/api/quizzes';
  constructor(private http: HttpClient) {}

   // دالة إنشاء امتحان جديد
  createQuiz(quizData: any): Observable<any> {
    const token = localStorage.getItem('token'); // تأكدي إن التوكن بيتخزن عند تسجيل الدخول
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, quizData, { headers });
  }

  // دالة جلب كل الامتحانات
  getAllQuizzes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

