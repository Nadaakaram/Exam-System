import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from './../../services/quiz.service';
// import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([this.createOption(), this.createOption()]), // نبدأ بخيارين على الأقل
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false],
    });
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOption());
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const formValue = this.quizForm.value;

      // تعديل الشكل ليتماشى مع الـ Schema
      const formattedQuiz = {
        title: formValue.title,
        questions: formValue.questions.map((q: any) => ({
          questionText: q.question,
          options: q.options.map((opt: any) => ({
            optionText: opt.text,
            isCorrect: opt.isCorrect,
          })),
        })),
      };

      this.quizService.createQuiz(formattedQuiz).subscribe({
        next: (res) => {
          console.log('Quiz saved successfully', res);
          alert('Quiz added!');
        },
        error: (err) => {
          console.error('Error saving quiz', err);
          alert('Error saving quiz');
        },
      });
    } else {
      alert('Form is invalid');
    }
  }
}
