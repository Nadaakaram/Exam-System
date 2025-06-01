import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from "../create-quiz/create-quiz.component";
import { RouterModule } from '@angular/router';
import { ExamsComponent } from "../exams/exams.component";
import { StudentsComponent } from "../students/students.component";


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, CreateQuizComponent, RouterModule, ExamsComponent, StudentsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'

})
export class AdminDashboardComponent  implements OnInit{
currentSection: string = 'prize-quizzes';
  showCreateQuiz: boolean = false;

  toggleCreateQuiz() {
    this.showCreateQuiz = !this.showCreateQuiz;
  }

  setSection(section: string) {
    this.currentSection = section;
    this.showCreateQuiz = false;
  }
    searchText = '';

 quizzes: any[] = [];
 constructor(private QuizService: QuizService) {}
 
       ngOnInit(): void {
     this.loadQuizzes();
   }
    loadQuizzes(): void {
    this.QuizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
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

}
