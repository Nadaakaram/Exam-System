import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  score: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;
  userName: string = 'User';
  quizTitle: string = '';

  constructor(private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      score: number,
      total: number,
      percentage: number,
      quizTitle: string
    };
    
    console.log('Navigation state:', state); 

    if (state) {
      this.score = state.score;
      this.totalQuestions = state.total;
      this.percentage = state.percentage;
      this.quizTitle = state.quizTitle || '';
    } else {
      this.router.navigate(['/']);
    } 
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (typeof currentUser.subscribe === 'function') {
      // Observable
      currentUser.subscribe({
        next: (user: any) => {
          this.userName = user.name || 'User';
        },
        error: (err: any) => {
          console.error('Error getting user:', err);
        }
      });
    } else if (typeof currentUser === 'object') {
      // localStorage
      this.userName = currentUser.name || 'User';
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/student-dashboard']); 
  }

}
