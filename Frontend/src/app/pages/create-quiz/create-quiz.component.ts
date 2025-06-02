import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/QuizService';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnChanges {
  quizForm!: FormGroup;
  @Input() quizData: any;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([] as FormGroup[]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quizData'] && this.quizData) {
      this.loadQuizData(this.quizData);
    }
  }

  loadQuizData(quiz: any): void {
    this.quizForm.patchValue({
      title: quiz.title
    });

    const questionsFormArray = this.fb.array([] as FormGroup[]);

    quiz.questions.forEach((q: any) => {
      const optionsFormArray = this.fb.array([] as FormGroup[]);
      q.options.forEach((opt: any) => {
        optionsFormArray.push(this.fb.group({
          text: [opt.optionText, Validators.required],
          isCorrect: [opt.isCorrect],
        }));
      });

      questionsFormArray.push(this.fb.group({
        question: [q.questionText, Validators.required],
        options: optionsFormArray
      }));
    });

    this.quizForm.setControl('questions', questionsFormArray);
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ] as FormGroup[]),
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

      if (this.quizData && this.quizData._id) {
        this.quizService.updateQuiz(this.quizData._id, formattedQuiz).subscribe({
          next: () => alert('Quiz updated successfully'),
          error: (err) => {
            console.error('Error updating quiz', err);
            alert('Error updating quiz');
          }
        });
      } else {
        this.quizService.createQuiz(formattedQuiz).subscribe({
          next: () => alert('Quiz created successfully'),
          error: (err) => {
            console.error('Error creating quiz', err);
            alert('Error creating quiz');
          }
        });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
