import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Quiz, Question, Result } from '../models/quiz.model';



@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // private apiUrl = 'http://localhost:5000/api/quizzes';
  private apiUrl = `${environment.apiUrl}/quizzes`;




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


  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }


  submitQuiz(quizId: string, answers: number[]): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');


  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post(`${this.apiUrl}/${quizId}/submit`, { answers }, { headers });
}

  calculateScore(quiz: Quiz, answers: number[]): number {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const correctIndex = question.options.findIndex(opt => opt.isCorrect === true);
      if (answers[index] === correctIndex) {
        score++;
      }

    });
    return score;
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


}








