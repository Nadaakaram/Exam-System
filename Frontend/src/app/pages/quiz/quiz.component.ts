import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz, Question, Result } from '../../models/quiz.model';

@Component({
  standalone: true,
  selector: 'app-quiz',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  userAnswers: number[] = [];
  isLoading = true;
  quizForm: FormGroup;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private fb: FormBuilder
  ) {this.quizForm = this.fb.group({
      selectedAnswer: [null]
    });}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.loadQuiz(quizId);
    }
  }

  loadQuiz(quizId: string): void {
    this.quizService.getQuizById(quizId).subscribe({
      next: (quiz: Quiz) => {
        this.quiz = quiz;
        this.userAnswers = new Array(quiz.questions.length).fill(null);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading quiz', err);
        this.isLoading = false;
      }
    });
  }

  get currentQuestion(): Question | null {
    return this.quiz?.questions[this.currentQuestionIndex] || null;
  }

  onSelectAnswer(answerIndex: number): void {
    this.userAnswers[this.currentQuestionIndex] = answerIndex;
    this.quizForm.patchValue({ selectedAnswer: answerIndex });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
      this.currentQuestionIndex++;
      this.quizForm.reset();
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.quizForm.reset();
    }
  }

  submitQuiz(): void {
  console.log('Submitting quiz:', {
    quizId: this.quiz?._id,
    answers: this.userAnswers
  });

  if (this.quiz && this.userAnswers.every(answer => answer !== null)) {
    this.isSubmitted = true;

    this.quizService.submitQuiz(this.quiz._id, this.userAnswers).subscribe({
      next: (result: any) => {
        this.router.navigate(['/result'], { 
          state: { 
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            quizTitle: this.quiz?.title
          }
        });
      },
      error: (err: any) => {
        console.error('Full error:', err); 
        this.isSubmitted = false;
      }
    });
  }
}


  isLastQuestion(): boolean {
    return this.currentQuestionIndex === (this.quiz?.questions.length || 0) - 1;
  }

  isAllAnswered(): boolean {
    return this.userAnswers.every(answer => answer !== null);
  }
  
}




  
  


