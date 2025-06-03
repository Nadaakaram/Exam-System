import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-s-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './s-dashboard.component.html',
  styleUrls: ['./s-dashboard.component.css']
})
export class SDashboardComponent  implements OnInit {
  searchText = '';
  quizzes: any[] = [];
userResults: { [quizId: string]: { score: number, total: number } } = {};

    constructor(private quizService: QuizService) {}
  ngOnInit(): void {
    this.loadQuizzes();
  this.loadUserResults();

  }

    loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        console.log('Quizzes loaded:', this.quizzes);
      },
      error: (err) => {
        console.error('Error loading quizzes', err);
      }
    });
  }

    get filteredQuizzes() {
    if (!this.searchText || this.searchText.trim() === '') {
      return [];
    }
    return this.quizzes.filter(quiz => quiz.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }

loadUserResults(): void {
  this.quizService.getMyResults().subscribe({
    next: (data) => {
      this.userResults = {};
      console.log("raw exams", data);
      data.forEach(exam => {
        this.userResults[exam.name] = {
          score: exam.score,
          total: exam.total
        };
      });
      console.log('User results loaded:', this.userResults);
    },
    error: (err) => {
      console.error('Error loading results', err);
    }
  });
}


}
