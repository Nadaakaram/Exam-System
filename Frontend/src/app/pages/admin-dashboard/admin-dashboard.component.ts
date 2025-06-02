import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { CreateQuizComponent } from "../create-quiz/create-quiz.component";
import { ExamsComponent } from "../exams/exams.component";
import { StudentsComponent } from "../students/students.component";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CreateQuizComponent, RouterModule, ExamsComponent, StudentsComponent, FormsModule, LoginComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentSection: string = 'dashboard';  
  searchText: string = '';
  showCreateQuiz: boolean = false;
  quizzes: any[] = [];
  filteredQuizzes: any[] = [];
  selectedQuiz: any = null;

  constructor(private QuizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  toggleCreateQuiz() {
    this.showCreateQuiz = !this.showCreateQuiz;
    if (!this.showCreateQuiz) {
      this.selectedQuiz = null;
    }
  }

  setSection(section: string) {
    this.currentSection = section;
    this.showCreateQuiz = false;
    this.selectedQuiz = null;

    if (section === 'dashboard') {
      this.loadQuizzes();
    }
  }

  loadQuizzes(): void {
    this.QuizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.applySearchFilter(); 
      },
      error: (err) => console.error('Error loading quizzes', err)
    });
  }
logout() {
  localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
}

  applySearchFilter() {
    const term = this.searchText.trim().toLowerCase();
    if (term === '') {
      this.filteredQuizzes = this.quizzes;
    } else {
      this.filteredQuizzes = this.quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(term)
      );
    }
  }

  onSearchChange() {
    this.applySearchFilter(); 
  }

  editQuiz(quiz: any) {
    this.selectedQuiz = { ...quiz };
    this.showCreateQuiz = true;
  }

  deleteQuiz(quizId: string) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.QuizService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter(q => q._id !== quizId);
          this.applySearchFilter();
          alert('Quiz deleted successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete quiz');
        }
      });
    }
  }
}
