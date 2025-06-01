import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { StudentsComponent } from './pages/students/students.component';

export const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to register page by default
    { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'prize-quizzes/create', component: CreateQuizComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'students', component: StudentsComponent },
];

