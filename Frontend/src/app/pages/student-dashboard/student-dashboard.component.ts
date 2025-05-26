import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, NgClass , FormsModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit{
  searchText = '';
  quizzes: any[] = [];

    constructor(private quizService: QuizService) {}

      ngOnInit(): void {
    this.loadQuizzes();
  }

    loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
      },
      error: (err) => {
        console.error('Error loading quizzes', err);
      }
    });
  }

  get filteredQuizzes() {
    if (!this.searchText) {
      return this.quizzes;
    }
    return this.quizzes.filter(quiz => quiz.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
